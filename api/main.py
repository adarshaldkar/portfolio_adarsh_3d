"""
Ask Adarsh AI -- FastAPI Backend
Custom Planner -> Capability -> Prompt -> OpenRouter -> SSE Streaming pipeline.
Windows-safe: yields UTF-8 bytes, explicit encoding throughout.
"""

import os
import sys
import json
from contextlib import asynccontextmanager

# Force UTF-8 stdout/stderr on Windows (prevents cp1252 UnicodeEncodeError)
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from dotenv import load_dotenv
load_dotenv()

from planner.intent_classifier import classify, Intent
from planner.execution_plan import get_capabilities, is_fallback, FALLBACK_RESPONSE
from capabilities.executor import execute
from prompts.builder import build_messages
from memory import conversation as memory
from providers.openrouter import stream_completion, PRIMARY_MODEL

# -------------------------------------------------
# App Setup
# -------------------------------------------------

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000"
).split(",")


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("[Ask Adarsh AI] Backend starting on port 8000...")
    yield
    print("[Ask Adarsh AI] Backend shutting down.")


app = FastAPI(
    title="Ask Adarsh AI",
    description="Portfolio AI Assistant -- Custom Planner -> Capability -> OpenRouter pipeline",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------------------------
# Request Models
# -------------------------------------------------

class ChatRequest(BaseModel):
    session_id: str
    message: str


# -------------------------------------------------
# SSE Helper — always yields UTF-8 bytes
# -------------------------------------------------

def sse_bytes(data: dict) -> bytes:
    """
    Serialize data to SSE-formatted UTF-8 bytes.
    json.dumps with ensure_ascii=False preserves Unicode.
    Explicit .encode('utf-8') avoids Windows cp1252 issues.
    """
    return (f"data: {json.dumps(data, ensure_ascii=False)}\n\n").encode("utf-8")


def sse_done() -> bytes:
    return b"data: [DONE]\n\n"


# -------------------------------------------------
# Core Pipeline
# -------------------------------------------------

async def run_pipeline(session_id: str, query: str):
    """
    Full pipeline:
    Query -> Intent -> Capabilities -> Context -> Prompt -> Stream (UTF-8 bytes)
    """
    # Step 1: Classify intent
    intent = classify(query)

    # Step 2: Handle fallback immediately
    if is_fallback(intent):
        yield sse_bytes({"token": FALLBACK_RESPONSE})
        yield sse_done()
        memory.add_turn(session_id, "user", query)
        memory.add_turn(session_id, "assistant", FALLBACK_RESPONSE)
        return

    # Step 3: Execute capabilities -> get context
    capability_names = get_capabilities(intent)
    context = execute(capability_names, query)

    # Step 4: Get conversation history
    history = memory.get_history(session_id)

    # Step 5: Build prompt messages
    messages = build_messages(query, context, history)

    # Step 6: Store user turn in memory
    memory.add_turn(session_id, "user", query)

    # Step 7: Stream from OpenRouter (yields str tokens)
    full_response = []
    try:
        async for token in stream_completion(messages):
            full_response.append(token)
            yield sse_bytes({"token": token})
    except Exception as e:
        err_msg = "Sorry, I had trouble generating a response. Please try again."
        yield sse_bytes({"token": err_msg})
        memory.add_turn(session_id, "assistant", err_msg)
        yield sse_done()
        return

    # Step 8: Store assistant turn in memory
    memory.add_turn(session_id, "assistant", "".join(full_response))

    # Step 9: Send metadata + done signal
    yield sse_bytes({"intent": intent.value, "capabilities": capability_names})
    yield sse_done()


# -------------------------------------------------
# API Endpoints
# -------------------------------------------------

@app.post("/api/chat")
async def chat(req: ChatRequest):
    """Streaming chat endpoint. Returns SSE stream token by token."""
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    if len(req.message) > 2000:
        raise HTTPException(status_code=400, detail="Message too long (max 2000 chars)")

    return StreamingResponse(
        run_pipeline(req.session_id, req.message.strip()),
        media_type="text/event-stream; charset=utf-8",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "Content-Encoding": "identity",
        },
    )


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "model": PRIMARY_MODEL,
        "active_sessions": memory.get_session_count(),
        "version": "1.0.0",
    }


@app.get("/")
async def root():
    return {
        "name": "Ask Adarsh AI",
        "description": "Portfolio AI Assistant for Adarsh Patel",
        "version": "1.0.0",
        "endpoints": ["/api/chat", "/health"],
    }
