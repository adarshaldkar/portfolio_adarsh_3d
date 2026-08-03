"""
OpenRouter Streaming Provider.
Custom HTTP client for OpenRouter API — no SDK dependency.
Streams tokens via SSE for typewriter effect in React frontend.
Windows-safe: explicit UTF-8 decoding throughout.
"""

import os
import json
import httpx
from typing import AsyncGenerator

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

PRIMARY_MODEL = os.getenv("OPENROUTER_MODEL", "google/gemma-4-31b-it:free")
FALLBACK_MODEL = os.getenv("OPENROUTER_FALLBACK", "nvidia/nemotron-3-super-120b-a12b:free")

# Chain of fallback models — tried in order on 404 / timeout
FALLBACK_CHAIN = [
    PRIMARY_MODEL,
    FALLBACK_MODEL,
    "openai/gpt-oss-20b:free",
    "google/gemma-4-26b-a4b-it:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
]

TEMPERATURE = 0.2
MAX_TOKENS = 800


def _get_headers() -> dict:
    return {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://adarsh-portfolio.vercel.app",
        "X-Title": "Adarsh AI -- Portfolio Assistant",
        "Accept-Charset": "utf-8",
    }


async def _try_single_model(
    messages: list[dict], model: str
) -> AsyncGenerator[str, None]:
    """Try a single model. Raises ValueError on non-200 status."""
    payload = {
        "model": model,
        "messages": messages,
        "temperature": TEMPERATURE,
        "max_tokens": MAX_TOKENS,
        "stream": True,
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        async with client.stream(
            "POST",
            OPENROUTER_BASE_URL,
            headers=_get_headers(),
            json=payload,
        ) as response:
            if response.status_code != 200:
                raise ValueError(f"HTTP {response.status_code} from model {model}")

            buffer = ""
            async for raw_bytes in response.aiter_bytes():
                buffer += raw_bytes.decode("utf-8", errors="replace")
                while "\n" in buffer:
                    line, buffer = buffer.split("\n", 1)
                    line = line.strip()
                    if not line or line == "data: [DONE]":
                        continue
                    if line.startswith("data: "):
                        try:
                            data = json.loads(line[6:])
                            delta = data["choices"][0]["delta"].get("content", "")
                            if delta:
                                yield delta
                        except (json.JSONDecodeError, KeyError, IndexError):
                            continue


async def stream_completion(
    messages: list[dict], model: str = PRIMARY_MODEL
) -> AsyncGenerator[str, None]:
    """
    Stream completion tokens from OpenRouter.
    Tries FALLBACK_CHAIN in order until one succeeds.
    Uses explicit UTF-8 decoding to handle all Unicode on Windows.
    """
    # Build chain starting from requested model
    chain = [model] + [m for m in FALLBACK_CHAIN if m != model]

    last_error = None
    for attempt_model in chain:
        try:
            yielded = False
            async for token in _try_single_model(messages, attempt_model):
                yielded = True
                yield token
            if yielded or True:  # success (even empty response is success)
                return
        except (ValueError, httpx.TimeoutException) as e:
            last_error = str(e)
            continue  # try next model in chain
        except Exception as e:
            last_error = repr(str(e))[:80]
            continue

    # All models failed
    yield f"Sorry, all available AI models returned errors right now. Please try again in a moment. Last error: {last_error or 'unknown'}"


async def complete(messages: list[dict], model: str = PRIMARY_MODEL) -> str:
    """
    Non-streaming completion — collects full response.
    """
    full_response = []
    async for token in stream_completion(messages, model):
        full_response.append(token)
    return "".join(full_response)
