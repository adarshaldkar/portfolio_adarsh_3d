"""
Conversation Memory — Session-scoped in-memory buffer.
No external database required. Zero infrastructure cost.
"""

import time
from typing import Optional

# Session storage: { session_id: { "turns": [...], "last_active": timestamp } }
_sessions: dict[str, dict] = {}

MAX_TURNS = 6          # Max conversation turns to keep (3 user + 3 assistant)
SESSION_TTL = 1800     # Session expires after 30 minutes of inactivity (seconds)


def get_history(session_id: str) -> list[dict]:
    """Return conversation history for a session."""
    _cleanup_expired_sessions()
    session = _sessions.get(session_id)
    if not session:
        return []
    session["last_active"] = time.time()
    return session["turns"]


def add_turn(session_id: str, role: str, content: str) -> None:
    """Add a conversation turn to the session buffer."""
    if session_id not in _sessions:
        _sessions[session_id] = {"turns": [], "last_active": time.time()}

    session = _sessions[session_id]
    session["turns"].append({"role": role, "content": content})
    session["last_active"] = time.time()

    # Trim to MAX_TURNS (keep most recent turns)
    if len(session["turns"]) > MAX_TURNS * 2:
        session["turns"] = session["turns"][-(MAX_TURNS * 2):]


def clear_session(session_id: str) -> None:
    """Clear a session's conversation history."""
    if session_id in _sessions:
        del _sessions[session_id]


def _cleanup_expired_sessions() -> None:
    """Remove sessions that have been inactive beyond TTL."""
    now = time.time()
    expired = [sid for sid, s in _sessions.items() if now - s["last_active"] > SESSION_TTL]
    for sid in expired:
        del _sessions[sid]


def get_session_count() -> int:
    """Return number of active sessions (for health monitoring)."""
    return len(_sessions)
