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

import httpx
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
from providers.groq_provider import stream_completion, GROQ_PRIMARY_MODEL as PRIMARY_MODEL

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
    Query -> Intent -> Capabilities -> Context -> Prompt -> Groq Stream (UTF-8 bytes)
    """
    # Step 1: Classify intent
    intent = classify(query)

    # Step 2: Handle fallback immediately
    if is_fallback(intent):
        yield sse_bytes({"token": FALLBACK_RESPONSE})
        yield sse_done()
        await memory.add_turn(session_id, "user", query)
        await memory.add_turn(session_id, "assistant", FALLBACK_RESPONSE)
        return

    # Step 3: Execute capabilities -> get context
    capability_names = get_capabilities(intent)
    context = execute(capability_names, query)

    # Step 4: Get conversation history from Redis (persistent)
    history = await memory.get_history(session_id)

    # Step 5: Build prompt messages
    messages = build_messages(query, context, history)

    # Step 6: Store user turn in Redis
    await memory.add_turn(session_id, "user", query)

    # Step 7: Stream from Groq (yields str tokens, max 2048 tokens)
    full_response = []
    try:
        async for token in stream_completion(messages):
            full_response.append(token)
            yield sse_bytes({"token": token})
    except Exception as e:
        err_msg = "Sorry, I had trouble generating a response. Please try again."
        yield sse_bytes({"token": err_msg})
        await memory.add_turn(session_id, "assistant", err_msg)
        yield sse_done()
        return

    # Step 8: Store assistant turn in Redis
    await memory.add_turn(session_id, "assistant", "".join(full_response))

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


@app.get("/api/stats")
@app.get("/stats")
async def get_live_stats():
    """
    Fetch live statistics server-side for GitHub (@adarshaldkar) and LeetCode (@Adarsh_Patel_14)
    bypassing browser CORS and rate limits.
    """
    stats = {
        "github": {
            "username": "adarshaldkar",
            "public_repos": 34,
            "followers": 6,
            "following": 13,
            "commitsThisYear": "450+",
        },
        "leetcode": {
            "username": "Adarsh_Patel_14",
            "totalSolved": 79,
            "totalQuestions": 4013,
            "easySolved": 38,
            "easyTotal": 958,
            "mediumSolved": 32,
            "mediumTotal": 2095,
            "hardSolved": 9,
            "hardTotal": 960,
            "acceptanceRate": "87.7%",
            "ranking": "#2,048,253",
            "contributionPoints": 332,
            "recentProblems": [
                "3Sum",
                "Intersection of Two Arrays II",
                "Stone Game III",
                "Ones and Zeroes",
                "Predict the Winner",
            ],
        },
    }

    # 1. Fetch GitHub Live Stats
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            gh_res = await client.get(
                "https://api.github.com/users/adarshaldkar",
                headers={"User-Agent": "FastAPI-Portfolio"},
            )
            if gh_res.status_code == 200:
                gh_data = gh_res.json()
                stats["github"]["public_repos"] = gh_data.get("public_repos", 34)
                stats["github"]["followers"] = gh_data.get("followers", 6)
                stats["github"]["following"] = gh_data.get("following", 13)
    except Exception as e:
        print(f"[Stats Endpoint] GitHub live fetch exception: {e}")

    # 2. Fetch LeetCode Live Stats via Alfa LeetCode API
    try:
        async with httpx.AsyncClient(timeout=6.0) as client:
            lc_res = await client.get(
                "https://alfa-leetcode-api.onrender.com/userProfile/Adarsh_Patel_14",
                headers={"User-Agent": "FastAPI-Portfolio"},
            )
            if lc_res.status_code == 200:
                lc_data = lc_res.json()
                if lc_data.get("totalSolved") is not None:
                    stats["leetcode"]["totalSolved"] = lc_data["totalSolved"]
                    stats["leetcode"]["totalQuestions"] = lc_data.get("totalQuestions", 4013)
                    stats["leetcode"]["easySolved"] = lc_data.get("easySolved", 38)
                    stats["leetcode"]["easyTotal"] = lc_data.get("totalEasy", 958)
                    stats["leetcode"]["mediumSolved"] = lc_data.get("mediumSolved", 32)
                    stats["leetcode"]["mediumTotal"] = lc_data.get("totalMedium", 2095)
                    stats["leetcode"]["hardSolved"] = lc_data.get("hardSolved", 9)
                    stats["leetcode"]["hardTotal"] = lc_data.get("totalHard", 960)
                    if lc_data.get("ranking"):
                        stats["leetcode"]["ranking"] = f"#{lc_data['ranking']:,}"
                    if lc_data.get("contributionPoint"):
                        stats["leetcode"]["contributionPoints"] = lc_data["contributionPoint"]

                    # Calculate acceptance rate
                    tot_sub = next(
                        (s["submissions"] for s in lc_data.get("totalSubmissions", []) if s.get("difficulty") == "All"),
                        212,
                    )
                    ac_sub = next(
                        (
                            s["submissions"]
                            for s in lc_data.get("matchedUserStats", {}).get("acSubmissionNum", [])
                            if s.get("difficulty") == "All"
                        ),
                        186,
                    )
                    if tot_sub > 0:
                        stats["leetcode"]["acceptanceRate"] = f"{((ac_sub / tot_sub) * 100):.1f}%"

                    # Recent submissions
                    recent = lc_data.get("recentSubmissions", [])
                    if recent:
                        accepted_titles = list(
                            dict.fromkeys([r["title"] for r in recent if r.get("statusDisplay") == "Accepted"])
                        )[:5]
                        if accepted_titles:
                            stats["leetcode"]["recentProblems"] = accepted_titles
    except Exception as e:
        print(f"[Stats Endpoint] LeetCode live fetch exception: {e}")

    return stats


class ContactRequest(BaseModel):
    name: str
    email: str
    message: str


TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")


async def _send_telegram_notification(name: str, email: str, message: str):
    """Send real-time alert to Adarsh's phone via Telegram Bot."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return

    text = f"""📬 *NEW PORTFOLIO CONTACT MESSAGE*

👤 *Name:* {name}
📧 *Email:* `{email}`

💬 *Message:*
{message}
"""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            await client.post(
                url,
                json={
                    "chat_id": TELEGRAM_CHAT_ID,
                    "text": text,
                    "parse_mode": "Markdown",
                },
            )
            print(f"[Telegram Notification] Sent to Chat ID {TELEGRAM_CHAT_ID} successfully!")
    except Exception as e:
        print(f"[Telegram Notification] Exception: {e}")


@app.post("/api/contact")
async def handle_contact(req: ContactRequest):
    """
    Handle portfolio contact form submissions.
    Saves to Redis & sends instant push notification to Telegram.
    """
    print(f"[Contact Form Submission] From: {req.name} <{req.email}>")
    print(f"[Message]: {req.message}")

    # 1. Save to Redis
    try:
        from memory.conversation import _redis_set, USE_REDIS
        if USE_REDIS:
            import time, json
            key = f"contact:{int(time.time())}:{req.email}"
            await _redis_set(
                key,
                json.dumps({
                    "name": req.name,
                    "email": req.email,
                    "message": req.message,
                    "timestamp": time.time(),
                }),
                86400 * 30,  # 30 days retention
            )
    except Exception as e:
        print(f"[Contact Form] Redis save notice: {e}")

    # 2. Send instant Telegram push notification to Adarsh's phone
    await _send_telegram_notification(req.name, req.email, req.message)

    return {
        "status": "success",
        "message": f"Thank you {req.name}! Your message has been sent to Adarsh. He will reply to {req.email} soon.",
    }


@app.get("/")
async def root():
    return {
        "name": "Ask Adarsh AI",
        "description": "Portfolio AI Assistant for Adarsh Patel",
        "version": "1.0.0",
        "endpoints": ["/api/chat", "/api/stats", "/api/contact", "/health"],
    }
