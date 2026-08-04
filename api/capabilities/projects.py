"""
Projects Capability.
Retrieves structured knowledge about Adarsh's 7 projects.
"""

import json
import os
import re
from .base import BaseCapability

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "knowledge", "projects")

# Project keyword → JSON file mapping (exact + common variants)
PROJECT_MAP = {
    # NoiseSense — all plausible spellings
    "noisesense": "noisesense.json",
    "noisesence": "noisesense.json",
    "noise sense": "noisesense.json",
    "noise mapping": "noisesense.json",
    "noisemap": "noisesense.json",
    "acoustic": "noisesense.json",
    "yamnet": "noisesense.json",
    "mqtt": "noisesense.json",
    # VibeCoder — all plausible spellings
    "vibecoder": "vibecoder.json",
    "vibecodeer": "vibecoder.json",
    "vibecodr": "vibecoder.json",
    "vibecode": "vibecoder.json",
    "vibe coder": "vibecoder.json",
    "vibe code": "vibecoder.json",
    "cloud ide": "vibecoder.json",
    "browser ide": "vibecoder.json",
    "monaco": "vibecoder.json",
    # Smart Industry 4.0
    "smart industry": "smart_factory.json",
    "industry 4.0": "smart_factory.json",
    "digital twin": "smart_factory.json",
    "predictive maintenance": "smart_factory.json",
    "smart factory": "smart_factory.json",
    "uip": "smart_factory.json",
    "uip-2025": "smart_factory.json",
    "unisys": "smart_factory.json",
    # MindCare AI
    "mindcare": "mindcare.json",
    "mindcar": "mindcare.json",
    "mind care": "mindcare.json",
    "mental health": "mindcare.json",
    "adaptive runtime": "mindcare.json",
    "mcp": "mindcare.json",
    "flagship": "mindcare.json",
    # LVMS
    "lvms": "lvms.json",
    "loan": "lvms.json",
    "vehicle management": "lvms.json",
    "fintech": "lvms.json",
    # DocuMind
    "documind": "documind.json",
    "docu mind": "documind.json",
    "document rag": "documind.json",
    "chromadb": "documind.json",
    "pdf qa": "documind.json",
    # TurfSpot
    "turfspot": "turfspot.json",
    "turf spot": "turfspot.json",
    "sports booking": "turfspot.json",
    "odoo": "turfspot.json",
    "turf": "turfspot.json",
    # Other / Additional Projects on GitHub
    "other": "other_projects.json",
    "other project": "other_projects.json",
    "other projects": "other_projects.json",
    "more project": "other_projects.json",
    "more projects": "other_projects.json",
    "besides": "other_projects.json",
    "skillswap": "other_projects.json",
    "skill swap": "other_projects.json",
    "cart": "other_projects.json",
    "e_commerce": "other_projects.json",
    "e-commerce": "other_projects.json",
    "ciphersql": "other_projects.json",
    "sql studio": "other_projects.json",
    "student response": "other_projects.json",
    "mitilence": "other_projects.json",
    "theekshi": "other_projects.json",
}

# Fuzzy prefix map — 5-char prefix of normalized project name → file
FUZZY_PREFIX_MAP = {
    "noise": "noisesense.json",    # noisesence, noisesens, noise...
    "vibec": "vibecoder.json",     # vibecodeer, vibecodr, vibecod...
    "smart": "smart_factory.json", # smart industry, smart factory
    "indus": "smart_factory.json", # industry 4.0
    "digit": "smart_factory.json", # digital twin
    "mindc": "mindcare.json",      # mindcare, mindcar
    "docum": "documind.json",      # documind, document
    "turfs": "turfspot.json",      # turfspot
    "skill": "other_projects.json",# skillswap
    "ciph":  "other_projects.json",# ciphersql
}

ALL_PROJECTS_SUMMARY = """
Adarsh has 34 repositories on GitHub, including 7 primary portfolio showcases and 27+ open-source projects:

Primary Showcase Projects:
1. **MindCare AI** — Flagship agentic AI platform. Custom runtime, Hybrid RAG, MCP, Memory, Evaluator. No LangChain.
2. **NoiseSense** — Distributed IoT acoustic pipeline. YAMNet ML, MQTT, InfluxDB, Grafana. 85%+ accuracy.
3. **VibeCoder** — Cloud browser IDE with AI assistant. Monaco Editor, Docker sandboxing, Gemini AI.
4. **Smart Industry 4.0** — Digital Twin + Predictive Maintenance. Top 24/8,000+ in Unisys UIP-2025.
5. **LVMS** — Confidential fintech SaaS. Complete Loan & Vehicle Management System. Live in production.
6. **DocuMind** — Document RAG system. Upload PDFs and ask questions. Exact page citations.
7. **TurfSpot** — Sports venue booking on Odoo ERP. Top 78/19,000+ in Odoo Hackathon 2025.

Other Notable GitHub Projects:
• **SkillSwap Platform** — Peer-to-peer skill exchange platform (React, Node.js)
• **E-Commerce & Cart System** — Full-stack shopping cart & checkout system (TypeScript, MongoDB)
• **CipherSQL Studio** — Interactive SQL query sandbox (JavaScript, Express)
• **Digital Back Office** — Internal enterprise workflow portal (TypeScript, React)
• **Student Response System** — Real-time classroom feedback tool (JavaScript)
• **Mitilence 2K26 Web Platform** — College technical fest web portal
• **Theekshi Boutique Storefront** — Custom e-commerce storefront design (TypeScript)
"""


def _load_project(filename: str) -> dict:
    path = os.path.join(KNOWLEDGE_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _format_project(data: dict) -> str:
    if "projects" in data:
        lines = [
            f"**{data['name']}**",
            f"_{data['tagline']}_",
            "",
            f"**Purpose:** {data['purpose']}",
            "",
            "**Additional Shipped Projects on GitHub:**",
        ]
        for p in data["projects"]:
            lines.extend([
                f"• **{p['name']}** ({p['tech']})",
                f"  {p['description']}",
                f"  GitHub: {p['github']}",
                ""
            ])
        return "\n".join(lines)

    lines = [
        f"**{data['name']}**",
        f"_{data['tagline']}_",
        "",
        f"**Purpose:** {data['purpose']}",
        "",
        f"**Architecture Pipeline:**",
    ]
    pipeline = data.get("architecture", {}).get("pipeline", [])
    for i, step in enumerate(pipeline):
        arrow = "↓" if i < len(pipeline) - 1 else ""
        lines.append(f"  {step}")
        if arrow:
            lines.append(f"  {arrow}")

    arch_desc = data.get("architecture", {}).get("description", "")
    if arch_desc:
        lines.extend(["", f"**How it works:** {arch_desc}"])

    tech = ", ".join(data.get("tech_stack", []))
    lines.extend(["", f"**Tech Stack:** {tech}"])

    achievements = data.get("key_achievements", [])
    if achievements:
        lines.extend(["", "**Key Achievements:**"])
        for a in achievements:
            lines.append(f"  • {a}")

    decisions = data.get("engineering_decisions", [])
    if decisions:
        lines.extend(["", "**Engineering Decisions:**"])
        for d in decisions:
            lines.append(f"  • **{d['decision']}** → {d['reason']}")

    github = data.get("github")
    if github:
        lines.extend(["", f"**GitHub:** {github}"])
    elif data.get("github_note"):
        lines.extend(["", f"**GitHub:** {data['github_note']}"])

    highlight = data.get("highlight") or data.get("hackathon", {}).get("rank", "")
    if highlight and isinstance(highlight, str):
        lines.extend(["", f"**Achievement:** {highlight}"])

    return "\n".join(lines)


class ProjectsCapability(BaseCapability):
    name = "projects"

    def retrieve(self, query: str) -> str:
        query_lower = query.lower()

        # Find matching project by exact keyword or variant
        matched_file = None
        for keyword, filename in PROJECT_MAP.items():
            if keyword in query_lower:
                matched_file = filename
                break

        # Fallback to fuzzy prefix matching if exact keyword missed
        if not matched_file:
            words = re.findall(r'\b\w+\b', query_lower)
            for w in words:
                prefix = w[:5]
                if prefix in FUZZY_PREFIX_MAP:
                    matched_file = FUZZY_PREFIX_MAP[prefix]
                    break

        if matched_file:
            try:
                data = _load_project(matched_file)
                return _format_project(data)
            except FileNotFoundError:
                return ALL_PROJECTS_SUMMARY

        # General projects question → return all projects summary
        return ALL_PROJECTS_SUMMARY
