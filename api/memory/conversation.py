"""
Conversation Memory — Upstash Redis (persistent) with in-memory fallback.

Priority:
1. Upstash Redis REST API → survives server restarts and page refreshes
2. In-memory dict → fallback when Redis is unavailable locally

Redis keys: "session:{session_id}" → JSON list of turns
TTL: 1800 seconds (30 minutes of inactivity)
"""

import os
import json
import time
import httpx
from typing import Optional

# ── Upstash Redis Config ──
UPSTASH_URL = os.getenv("UPSTASH_REDIS_REST_URL", "")
UPSTASH_TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN", "")
USE_REDIS = bool(UPSTASH_URL and UPSTASH_TOKEN)

# ── In-Memory Fallback ──
_sessions: dict[str, dict] = {}

MAX_TURNS = 6        # Keep last 6 turns (3 user + 3 assistant)
SESSION_TTL = 1800   # 30 minutes


# ─────────────────────────────────────────────
# Upstash REST Helpers
# ─────────────────────────────────────────────

def _upstash_headers() -> dict:
    return {"Authorization": f"Bearer {UPSTASH_TOKEN}"}


async def _redis_get(key: str) -> Optional[str]:
    """GET a Redis key via Upstash REST API."""
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            res = await client.get(
                f"{UPSTASH_URL}/get/{key}",
                headers=_upstash_headers(),
            )
            data = res.json()
            return data.get("result")  # None if key doesn't exist
    except Exception as e:
        print(f"[Redis] GET error: {e}")
        return None


async def _redis_set(key: str, value: str, ttl: int) -> bool:
    """SET a Redis key with EX TTL via Upstash REST API."""
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            # Upstash REST: /set/key/value/EX/ttl
            import urllib.parse
            encoded_value = urllib.parse.quote(value, safe="")
            res = await client.get(
                f"{UPSTASH_URL}/set/{key}/{encoded_value}/EX/{ttl}",
                headers=_upstash_headers(),
            )
            return res.status_code == 200
    except Exception as e:
        print(f"[Redis] SET error: {e}")
        return False


async def _redis_del(key: str) -> None:
    """DEL a Redis key via Upstash REST API."""
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            await client.get(
                f"{UPSTASH_URL}/del/{key}",
                headers=_upstash_headers(),
            )
    except Exception as e:
        print(f"[Redis] DEL error: {e}")


# ─────────────────────────────────────────────
# Public API (async)
# ─────────────────────────────────────────────

async def get_history(session_id: str) -> list[dict]:
    """Return conversation history for a session."""
    if USE_REDIS:
        raw = await _redis_get(f"session:{session_id}")
        if raw:
            try:
                return json.loads(raw)
            except json.JSONDecodeError:
                return []
        return []

    # In-memory fallback
    _cleanup_expired_sessions()
    session = _sessions.get(session_id)
    if not session:
        return []
    session["last_active"] = time.time()
    return session["turns"]


async def add_turn(session_id: str, role: str, content: str) -> None:
    """Add a conversation turn and persist to Redis."""
    if USE_REDIS:
        turns = await get_history(session_id)
        turns.append({"role": role, "content": content})
        # Trim to MAX_TURNS * 2 messages (user + assistant pairs)
        if len(turns) > MAX_TURNS * 2:
            turns = turns[-(MAX_TURNS * 2):]
        await _redis_set(f"session:{session_id}", json.dumps(turns), SESSION_TTL)
        return

    # In-memory fallback
    if session_id not in _sessions:
        _sessions[session_id] = {"turns": [], "last_active": time.time()}
    session = _sessions[session_id]
    session["turns"].append({"role": role, "content": content})
    session["last_active"] = time.time()
    if len(session["turns"]) > MAX_TURNS * 2:
        session["turns"] = session["turns"][-(MAX_TURNS * 2):]


async def clear_session(session_id: str) -> None:
    """Clear a session's conversation history."""
    if USE_REDIS:
        await _redis_del(f"session:{session_id}")
        return
    if session_id in _sessions:
        del _sessions[session_id]


def _cleanup_expired_sessions() -> None:
    now = time.time()
    expired = [sid for sid, s in _sessions.items() if now - s["last_active"] > SESSION_TTL]
    for sid in expired:
        del _sessions[sid]


def get_session_count() -> int:
    """Return number of active sessions (for health monitoring)."""
    return len(_sessions)


def is_redis_enabled() -> bool:
    return USE_REDIS
