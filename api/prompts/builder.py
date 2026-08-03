"""
Prompt Builder — Assembles the final prompt for the LLM.
System Prompt + Retrieved Context + Conversation History → Messages list.
"""

from .system_prompt import SYSTEM_PROMPT


def build_messages(
    query: str,
    context: str,
    history: list[dict],
) -> list[dict]:
    """
    Assemble the complete messages list for OpenRouter.

    Structure:
    1. System message (17-section system prompt + runtime context)
    2. Conversation history (last N turns)
    3. Current user query
    """
    # Build system message with injected context
    system_content = SYSTEM_PROMPT

    if context:
        system_content += f"""

# ============================================================
# RUNTIME CONTEXT
# The following information was retrieved for this query.
# Use ONLY this context to answer. Do not go beyond it.
# ============================================================

{context}

# ============================================================
# END OF RUNTIME CONTEXT
# ============================================================
"""
    else:
        system_content += """

# RUNTIME CONTEXT
No specific context was retrieved for this query.
If the answer is not in your general knowledge about Adarsh,
say: "I don't have that specific detail. Please contact Adarsh directly at adarshaldkar@gmail.com"
"""

    messages: list[dict] = [
        {"role": "system", "content": system_content}
    ]

    # Append conversation history (already trimmed by memory module)
    for turn in history:
        messages.append({"role": turn["role"], "content": turn["content"]})

    # Append current user query
    messages.append({"role": "user", "content": query})

    return messages
