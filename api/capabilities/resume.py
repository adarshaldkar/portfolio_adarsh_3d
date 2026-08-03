"""
Resume Capability — Education, Skills, Tech Stack, Summary.
"""

import json
import os
from .base import BaseCapability

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "knowledge")


def _load_resume() -> dict:
    with open(os.path.join(KNOWLEDGE_DIR, "resume.json"), "r", encoding="utf-8") as f:
        return json.load(f)


class ResumeCapability(BaseCapability):
    name = "resume"

    def retrieve(self, query: str) -> str:
        data = _load_resume()
        query_lower = query.lower()

        if any(k in query_lower for k in ["education", "degree", "cgpa", "college", "university", "mvit", "b.tech", "btech"]):
            edu = data["education"]
            return f"""**Education**

**Degree:** {edu['degree']}
**Institute:** {edu['institute']}
**CGPA:** {edu['cgpa']}
**Duration:** {edu['duration']}
**Key Courses:** {', '.join(edu['relevant_courses'])}"""

        if any(k in query_lower for k in ["skill", "tech stack", "technology", "language", "framework", "know", "tools", "stack"]):
            skills = data["skills"]
            return f"""**Technical Skills & Stack**

**AI / ML:**
{', '.join(skills['ai_ml'])}

**Backend:**
{', '.join(skills['backend'])}

**Frontend:**
{', '.join(skills['frontend'])}

**DevOps / Infrastructure:**
{', '.join(skills['devops_infra'])}

**Databases:**
{', '.join(skills['databases'])}

**Programming Languages:**
{', '.join(skills['languages'])}

**Core Strengths:**
{chr(10).join('• ' + s for s in data['strengths'])}"""

        # General / about summary
        edu = data["education"]
        skills = data["skills"]
        return f"""**Adarsh Patel — Summary**

{data['summary']}

**Education:** {edu['degree']} from {edu['institute']} (CGPA: {edu['cgpa']}, {edu['duration']})

**Primary Languages:** {', '.join(skills['languages'])}
**AI / ML Stack:** {', '.join(skills['ai_ml'][:6])}...
**Backend Stack:** {', '.join(skills['backend'][:5])}...
**Frontend Stack:** {', '.join(skills['frontend'][:4])}...

**Strengths:**
{chr(10).join('• ' + s for s in data['strengths'])}"""
