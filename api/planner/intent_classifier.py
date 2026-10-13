"""
Intent Classifier — Fast keyword-based intent detection.
Zero latency. No LLM call needed for classification.
"""

from enum import Enum
import re


class Intent(str, Enum):
    HR = "HR_INTENT"
    PROJECT = "PROJECT_INTENT"
    ARCHITECTURE = "ARCHITECTURE_INTENT"
    EXPERIENCE = "EXPERIENCE_INTENT"
    ACHIEVEMENTS = "ACHIEVEMENTS_INTENT"
    SKILLS = "SKILLS_INTENT"
    RESUME = "RESUME_INTENT"
    CONTACT = "CONTACT_INTENT"
    COMPARE = "COMPARE_INTENT"
    ABOUT = "ABOUT_INTENT"
    FALLBACK = "FALLBACK"


# Keyword lists per intent — order matters (checked top to bottom)
INTENT_PATTERNS: list[tuple[Intent, list[str]]] = [
    (Intent.HR, [
        "why should we hire", "why hire", "why choose you", "why should i hire",
        "why are you the best", "what makes you unique", "why hire adarsh",
        "strength", "strengths", "weakness", "weaknesses", "areas of improvement",
        "greatest strength", "biggest weakness", "flaw",
        "where do you see yourself", "5 years", "five years", "career goal", "future plan",
        "aspirations", "work style", "work culture", "ideal environment",
        "conflict", "disagreement", "handle pressure", "work under pressure", "teamwork", "team player", "handle stress",
        "relocat", "willing to relocate", "open to relocate", "notice period", "when can you start",
        "availability", "salary expectation", "compensation",
    ]),
    (Intent.CONTACT, [
        "email", "contact", "reach", "linkedin", "github", "phone",
        "how to get in touch", "get in touch", "reach out", "connect with",
        "how to hire", "contact to hire",
    ]),
    (Intent.COMPARE, [
        "compare", "best project", "strongest project", "which project", "better",
        "vs ", " vs", "most impressive", "most complex", "recommend", "which one",
    ]),
    (Intent.ARCHITECTURE, [
        "architecture", "how does it work", "how did you build", "pipeline",
        "adaptive runtime", "custom runtime", "langchain", "rag", "retrieval",
        "hybrid rag", "vector", "chromadb", "mcp", "model context protocol",
        "planner", "capability", "memory", "evaluator", "prompt", "streaming",
        "how is this built", "how are you built", "system design", "infrastructure",
        "why not langchain", "without langchain",
    ]),
    (Intent.PROJECT, [
        "noisesense", "noisesence", "noise sense", "noise mapping", "noisemap", "acoustic", "yamnet", "mqtt",
        "vibecoder", "vibecodeer", "vibecodr", "vibecode", "vibe coder", "vibe code", "cloud ide", "browser ide", "monaco",
        "smart industry", "industry 4.0", "digital twin", "predictive maintenance", "smart factory", "uip", "unisys",
        "mindcare", "mindcar", "mind care", "mental health", "flagship",
        "lvms", "loan", "vehicle management", "fintech",
        "documind", "docu mind", "document rag", "chromadb", "pdf qa",
        "turfspot", "turf spot", "sports booking", "odoo", "turf",
        "project", "projects", "what have you built", "show me",
    ]),
    (Intent.ACHIEVEMENTS, [
        "hackathon", "achievement", "rank", "ranking", "top 78", "top 24",
        "19000", "8000", "19,000", "8,000", "odoo hackathon", "unisys",
        "uip", "uip-2025", "leetcode", "dsa", "problems solved",
        "certification", "certificate", "award", "winner",
    ]),
    (Intent.EXPERIENCE, [
        "internship", "intern", "work experience", "job", "company",
        "planarc", "bluestock", "unified mentorship", "freelance",
        "where did he work", "worked at", "experience",
    ]),
    (Intent.SKILLS, [
        "tech stack", "skills", "technology", "technologies", "languages",
        "framework", "tools", "python", "react", "fastapi", "docker",
        "what does he know", "can he", "proficient", "expertise",
    ]),
    (Intent.RESUME, [
        "resume", "cv", "education", "degree", "cgpa", "college",
        "university", "mvit", "b.tech", "btech", "gpa",
        "qualification", "academic", "graduation",
    ]),
    (Intent.ABOUT, [
        "who is adarsh", "tell me about adarsh", "introduce", "about him",
        "background", "tell me about yourself", "who are you",
        "overview", "summary", "profile",
    ]),
]

FALLBACK_KEYWORDS = [
    "quantum", "biology", "chemistry", "physics", "math problem",
    "solve this", "write code for", "javascript tutorial", "java",
    "random", "weather", "news", "stock price", "sports score",
]


def classify(query: str) -> Intent:
    """
    Classify user query into an intent type.
    Uses keyword pattern matching — zero latency, no LLM call.
    """
    query_lower = query.lower().strip()

    # Check for obvious off-topic questions
    if any(kw in query_lower for kw in FALLBACK_KEYWORDS):
        # Make sure it's not about Adarsh's relevant work
        if not any(k in query_lower for k in ["adarsh", "project", "noisesense", "mindcare", "vibecoder"]):
            return Intent.FALLBACK

    # Check intent patterns in priority order
    for intent, keywords in INTENT_PATTERNS:
        if any(kw in query_lower for kw in keywords):
            return intent

    # Default to ABOUT for short generic queries
    if len(query_lower.split()) <= 5:
        return Intent.ABOUT

    return Intent.FALLBACK
