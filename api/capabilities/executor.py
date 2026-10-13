"""
Capability Executor — Routes intent to correct capability modules.
"""

from .projects import ProjectsCapability
from .architecture import ArchitectureCapability
from .resume import ResumeCapability
from .achievements import AchievementsCapability
from .experience import ExperienceCapability
from .contact import ContactCapability
from .hr import HRCapability

# Instantiate all capabilities once
_capabilities = {
    "projects": ProjectsCapability(),
    "architecture": ArchitectureCapability(),
    "resume": ResumeCapability(),
    "achievements": AchievementsCapability(),
    "experience": ExperienceCapability(),
    "contact": ContactCapability(),
    "hr": HRCapability(),
}


def execute(capability_names: list[str], query: str) -> str:
    """
    Execute one or more capabilities for the given query.
    Returns merged context string.
    """
    if not capability_names:
        return ""

    contexts = []
    for name in capability_names:
        cap = _capabilities.get(name)
        if cap:
            context = cap.retrieve(query)
            if context:
                contexts.append(context)

    return "\n\n---\n\n".join(contexts)
