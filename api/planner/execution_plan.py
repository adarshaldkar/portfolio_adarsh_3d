"""
Execution Plan — Maps intents to ordered capability lists.
"""

from .intent_classifier import Intent

EXECUTION_MAP: dict[Intent, list[str]] = {
    Intent.HR:           ["hr", "resume", "achievements"],
    Intent.PROJECT:      ["projects"],
    Intent.ARCHITECTURE: ["architecture", "projects"],
    Intent.EXPERIENCE:   ["experience"],
    Intent.ACHIEVEMENTS: ["achievements"],
    Intent.SKILLS:       ["resume"],
    Intent.RESUME:       ["resume", "experience"],
    Intent.CONTACT:      ["contact"],
    Intent.COMPARE:      ["projects", "architecture"],
    Intent.ABOUT:        ["resume", "achievements", "experience"],
    Intent.FALLBACK:     [],
}

FALLBACK_RESPONSE = (
    "I'm designed specifically to answer questions about Adarsh Patel — "
    "his projects, AI systems architecture, engineering work, skills, experience, and achievements. "
    "For that kind of question, a general-purpose AI assistant would be more helpful. "
    "Is there anything about Adarsh's work I can help you with?"
)


def get_capabilities(intent: Intent) -> list[str]:
    """Return ordered list of capabilities to execute for the given intent."""
    return EXECUTION_MAP.get(intent, [])


def is_fallback(intent: Intent) -> bool:
    return intent == Intent.FALLBACK
