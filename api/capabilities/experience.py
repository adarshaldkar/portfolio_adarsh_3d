"""
Experience Capability — Internships and Freelance Work.
"""

import json
import os
from .base import BaseCapability

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "knowledge")


def _load_experience() -> dict:
    with open(os.path.join(KNOWLEDGE_DIR, "experience.json"), "r", encoding="utf-8") as f:
        return json.load(f)


class ExperienceCapability(BaseCapability):
    name = "experience"

    def retrieve(self, query: str) -> str:
        data = _load_experience()
        query_lower = query.lower()

        # Specific company queries
        for exp in data["work_experience"]:
            company_lower = exp["company"].lower()
            if company_lower in query_lower or any(k in query_lower for k in company_lower.split()):
                lines = [
                    f"**{exp['company']} — {exp['role']}**",
                    f"Duration: {exp['duration']} | Type: {exp['type']}",
                    "",
                    exp["description"],
                    "",
                    f"**Tech Stack:** {', '.join(exp['tech_stack'])}",
                    "",
                    "**Key Contributions:**",
                ]
                for c in exp.get("key_contributions", []):
                    lines.append(f"• {c}")
                if exp.get("impact"):
                    lines.extend(["", f"**Impact:** {exp['impact']}"])
                if exp.get("note"):
                    lines.extend(["", f"**Note:** {exp['note']}"])
                return "\n".join(lines)

        # General experience summary
        lines = ["**Work Experience**", ""]
        for exp in data["work_experience"]:
            lines.extend([
                f"**{exp['company']} — {exp['role']}**",
                f"{exp['duration']} | {exp['type']}",
                exp["description"],
                f"Stack: {', '.join(exp['tech_stack'][:4])}",
                "",
            ])

        lines.extend([
            "---",
            "",
            data["freelance_summary"],
        ])
        return "\n".join(lines)
