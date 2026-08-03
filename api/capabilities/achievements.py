"""
Achievements Capability — Hackathons, LeetCode, Certifications.
"""

import json
import os
from .base import BaseCapability

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "knowledge")


def _load_achievements() -> dict:
    with open(os.path.join(KNOWLEDGE_DIR, "achievements.json"), "r", encoding="utf-8") as f:
        return json.load(f)


class AchievementsCapability(BaseCapability):
    name = "achievements"

    def retrieve(self, query: str) -> str:
        data = _load_achievements()
        query_lower = query.lower()

        if any(k in query_lower for k in ["leetcode", "dsa", "coding", "problems", "algorithm"]):
            dsa = data["dsa"]
            return f"""**LeetCode & DSA**

**Platform:** {dsa['platform']}
**Problems Solved:** {dsa['problems_solved']}
**Topics:** {', '.join(dsa['topics'])}
**Approach:** {dsa['focus']}

Adarsh maintains consistent problem-solving practice across all major DSA categories."""

        if any(k in query_lower for k in ["certification", "certificate", "course", "ibm", "coursera", "deeplearning"]):
            certs = data["certifications"]
            return f"""**Certifications**

{chr(10).join('• ' + c for c in certs)}"""

        # General hackathon / achievements question
        hackathons = data["hackathons"]
        dsa = data["dsa"]

        lines = ["**Hackathon Achievements**", ""]
        for h in hackathons:
            lines.extend([
                f"**{h['name']}**",
                f"Rank: {h['rank']} ({h['significance']})",
                f"Project: {h['project']}",
                f"Year: {h['year']}",
                f"{h['description']}",
                "",
            ])

        lines.extend([
            "---",
            "",
            f"**LeetCode:** {dsa['problems_solved']} problems solved",
            f"Topics: {', '.join(dsa['topics'][:6])}...",
            "",
            "**Certifications:**",
        ])
        for c in data["certifications"]:
            lines.append(f"• {c}")

        return "\n".join(lines)
