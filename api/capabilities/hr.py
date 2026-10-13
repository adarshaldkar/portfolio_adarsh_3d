"""
HR Capability — Handles behavioral & HR interview questions.
Covers: Why hire Adarsh, strengths & weaknesses, 5-year goals, work culture, conflict resolution, relocation & availability.
"""

import json
import os
from .base import BaseCapability

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "knowledge")


def _load_hr_knowledge() -> dict:
    filepath = os.path.join(KNOWLEDGE_DIR, "hr_interview.json")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


class HRCapability(BaseCapability):
    name = "hr"

    def retrieve(self, query: str) -> str:
        data = _load_hr_knowledge()
        query_lower = query.lower()

        sections = []

        # 1. Why Hire / Unique Value Proposition
        if any(k in query_lower for k in [
            "why should we hire", "why hire", "why choose", "hire you", "hire adarsh",
            "why should i hire", "what makes you unique", "why are you the best",
            "what can you bring", "value proposition", "why should a company hire"
        ]):
            why = data["why_hire_adarsh"]
            reasons_formatted = "\n".join(
                f"• **{r['title']}:** {r['detail']}" for r in why["key_reasons"]
            )
            sections.append(f"""**Why Hire Adarsh Patel**

{why['summary']}

**Key Distinctions:**
{reasons_formatted}""")

        # 2. Strengths and Weaknesses
        is_strength_query = any(k in query_lower for k in ["strength", "strengths", "what are your strengths", "greatest strength"])
        is_weakness_query = any(k in query_lower for k in ["weakness", "weaknesses", "areas of improvement", "biggest weakness", "flaw"])

        if is_strength_query or is_weakness_query or "strength and weakness" in query_lower or "strengths and weaknesses" in query_lower:
            strengths_list = "\n".join(
                f"• **{s['name']}:** {s['description']}" for s in data["strengths"]
            )
            weaknesses_list = "\n".join(
                f"• **{w['name']}:** {w['context']} *How he addresses it:* {w['how_he_addresses_it']}"
                for w in data["weaknesses"]
            )

            if is_strength_query and not is_weakness_query:
                sections.append(f"""**Key Strengths of Adarsh Patel**\n\n{strengths_list}""")
            elif is_weakness_query and not is_strength_query:
                sections.append(f"""**Constructive Weaknesses & How Adarsh Manages Them**\n\n{weaknesses_list}""")
            else:
                sections.append(f"""**Adarsh Patel — Strengths & Weaknesses**

**Core Strengths:**
{strengths_list}

**Constructive Weaknesses (with proactive management):**
{weaknesses_list}""")

        # 3. Career Goals / 5-Year Vision
        if any(k in query_lower for k in ["5 years", "five years", "where do you see", "career goal", "future plan", "aspiration", "long term", "short term"]):
            goals = data["career_goals"]
            sections.append(f"""**Career Goals & Future Vision**

• **Short-Term Goal:** {goals['short_term']}
• **5-Year Vision:** {goals['long_term_5_years']}""")

        # 4. Work Style, Culture, Conflict, Pressure
        if any(k in query_lower for k in ["conflict", "pressure", "culture", "work style", "environment", "teamwork", "disagreement", "collaborate", "stress"]):
            style = data["work_style_and_culture"]
            sections.append(f"""**Work Style, Culture & Team Collaboration**

• **Ideal Culture:** {style['ideal_environment']}
• **Collaboration Style:** {style['collaboration']}
• **Handling Technical Disagreements / Conflict:** {style['approach_to_conflict']}""")

        # 5. Logistics, Relocation, Availability
        if any(k in query_lower for k in ["relocat", "location", "availability", "notice period", "when can you start", "remote", "hybrid", "on-site", "full time", "internship"]):
            logistics = data["logistics"]
            sections.append(f"""**Location & Availability Logistics**

• **Current Location:** {logistics['location']}
• **Relocation:** {logistics['relocation']}
• **Work Modes:** {logistics['work_mode']}
• **Role Types Open To:** {logistics['role_types']}
• **Availability:** {logistics['availability']}""")

        # If none specifically matched or it's a general interview question, provide full HR overview
        if not sections:
            why = data["why_hire_adarsh"]
            strengths_list = "\n".join(f"• **{s['name']}:** {s['description']}" for s in data["strengths"][:3])
            weaknesses_list = "\n".join(f"• **{w['name']}:** {w['how_he_addresses_it']}" for w in data["weaknesses"][:2])
            goals = data["career_goals"]
            logistics = data["logistics"]

            return f"""**Adarsh Patel — Recruiter & HR Overview**

**Summary:** {why['summary']}

**Key Strengths:**
{strengths_list}

**Constructive Weaknesses:**
{weaknesses_list}

**Career Goals:** {goals['short_term']}

**Availability:** {logistics['availability']} · {logistics['relocation']} (Current: {logistics['location']})"""

        return "\n\n---\n\n".join(sections)
