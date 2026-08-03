"""
Contact Capability — Verified contact information only.
"""

import json
import os
from .base import BaseCapability

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "knowledge")


def _load_contact() -> dict:
    with open(os.path.join(KNOWLEDGE_DIR, "contact.json"), "r", encoding="utf-8") as f:
        return json.load(f)


class ContactCapability(BaseCapability):
    name = "contact"

    def retrieve(self, query: str) -> str:
        data = _load_contact()

        return f"""**Contact Adarsh Patel**

📧 **Email:** {data['email']}
💼 **LinkedIn:** {data['linkedin']}
🐙 **GitHub:** {data['github']}
🌐 **Portfolio:** {data['portfolio']}

**Availability:** {data['availability']}
**Response Time:** {data['response_time']}

Feel free to reach out via email or LinkedIn — Adarsh is open to discussing opportunities, collaborations, and technical conversations."""
