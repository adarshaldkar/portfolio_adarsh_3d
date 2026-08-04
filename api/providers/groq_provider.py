"""
Groq Streaming Provider.
Uses Groq's OpenAI-compatible REST API via httpx.
Max output: 8,192 tokens (10x more than OpenRouter free tier).
Speed: ~0.3-1s (LPU hardware — much faster than GPU-based providers).
Windows-safe: explicit UTF-8 decoding throughout.
"""

import os
import json
import httpx
from typing import AsyncGenerator

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions"

# Best free Groq models — tried in order
GROQ_PRIMARY_MODEL = "llama-3.3-70b-versatile"
GROQ_FALLBACK_CHAIN = [
    "llama-3.3-70b-versatile",   # Best quality, 32k context, 8192 max output
    "gemma2-9b-it",               # Lightweight, fast, good quality
    "llama-3.1-8b-instant",       # Ultra-fast fallback
]

TEMPERATURE = 0.2
MAX_TOKENS = 2048    # 2.5x more than old 800-token OpenRouter cap


def _get_headers() -> dict:
    return {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }


async def _try_groq_model(
    messages: list[dict], model: str
) -> AsyncGenerator[str, None]:
    """Stream tokens from a single Groq model. Raises ValueError on non-200."""
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
            GROQ_BASE_URL,
            headers=_get_headers(),
            json=payload,
        ) as response:
            if response.status_code != 200:
                body = await response.aread()
                raise ValueError(
                    f"Groq HTTP {response.status_code} from {model}: {body[:200]}"
                )

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
    messages: list[dict], model: str = GROQ_PRIMARY_MODEL
) -> AsyncGenerator[str, None]:
    """
    Stream completion tokens from Groq with fallback chain.
    Falls back to OpenRouter if all Groq models fail.
    """
    chain = [model] + [m for m in GROQ_FALLBACK_CHAIN if m != model]

    last_error = None
    for attempt_model in chain:
        try:
            yielded_any = False
            async for token in _try_groq_model(messages, attempt_model):
                yielded_any = True
                yield token
            if yielded_any or True:
                return
        except (ValueError, httpx.TimeoutException) as e:
            last_error = str(e)
            print(f"[Groq] Model {attempt_model} failed: {e} — trying next")
            continue
        except Exception as e:
            last_error = repr(str(e))[:120]
            print(f"[Groq] Unexpected error with {attempt_model}: {e}")
            continue

    # All Groq models failed → try OpenRouter as last resort
    try:
        from .openrouter import stream_completion as openrouter_stream
        print("[Groq] All Groq models failed — falling back to OpenRouter")
        async for token in openrouter_stream(messages):
            yield token
    except Exception as e:
        yield f"Sorry, all AI models are currently unavailable. Please try again. (Error: {last_error or str(e)})"


async def complete(messages: list[dict], model: str = GROQ_PRIMARY_MODEL) -> str:
    """Non-streaming completion — collects full response."""
    full_response = []
    async for token in stream_completion(messages, model):
        full_response.append(token)
    return "".join(full_response)
