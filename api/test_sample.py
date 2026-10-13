"""
test_sample.py -- Ask Adarsh AI Test Suite
Tests 10 sample recruiter questions and validates responses.
Run: python test_sample.py
"""

import sys
import json
import time
import urllib.request
import urllib.error

# Force UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

API_URL = "http://localhost:8000"

# ──────────────────────────────────────────────────────────────────────────────
# Test Cases: (question, expected_keywords, intent_expected, description)
# ──────────────────────────────────────────────────────────────────────────────
TEST_CASES = [
    {
        "id": 1,
        "question": "Tell me about MindCare AI",
        "expected_keywords": ["MindCare", "Planner", "RAG", "Runtime", "capability"],
        "expected_intent": "PROJECT_INTENT",
        "description": "Flagship project — should explain Planner, RAG, Runtime",
    },
    {
        "id": 2,
        "question": "What are Adarsh's hackathon rankings?",
        "expected_keywords": ["78", "8,000", "Odoo", "Unisys"],
        "expected_intent": "ACHIEVEMENTS_INTENT",
        "description": "Should return Top 78/19K and Top 24/8K hackathon ranks",
    },
    {
        "id": 3,
        "question": "Tell me about NoiseSense",
        "expected_keywords": ["YAMNet", "MQTT", "acoustic", "InfluxDB"],
        "expected_intent": "PROJECT_INTENT",
        "description": "NoiseSense project — should mention key tech",
    },
    {
        "id": 4,
        "question": "Why didn't Adarsh use LangChain?",
        "expected_keywords": ["custom", "runtime", "control"],
        "expected_intent": "ARCHITECTURE_INTENT",
        "description": "Custom runtime philosophy — architecture decision",
    },
    {
        "id": 5,
        "question": "How can I contact Adarsh?",
        "expected_keywords": ["adarshaldkar@gmail.com", "LinkedIn", "GitHub"],
        "expected_intent": "CONTACT_INTENT",
        "description": "Contact info — should return email, LinkedIn, GitHub",
    },
    {
        "id": 6,
        "question": "What is his tech stack and skills?",
        "expected_keywords": ["Python", "React", "FastAPI", "Docker"],
        "expected_intent": "SKILLS_INTENT",
        "description": "Skills query — should list core technologies",
    },
    {
        "id": 7,
        "question": "Explain quantum physics",
        "expected_keywords": ["designed specifically", "Adarsh Patel"],
        "expected_intent": "FALLBACK",
        "description": "Off-topic query — should politely refuse (scope guard)",
    },
    {
        "id": 8,
        "question": "Who is Adarsh? Give me an overview.",
        "expected_keywords": ["AI", "engineer", "Full Stack"],
        "expected_intent": "ABOUT_INTENT",
        "description": "About query — should give summary of Adarsh",
    },
    {
        "id": 9,
        "question": "Tell me about VibeCoder",
        "expected_keywords": ["IDE", "Monaco", "Docker"],
        "expected_intent": "PROJECT_INTENT",
        "description": "VibeCoder project — should mention Monaco Editor, Docker",
    },
    {
        "id": 10,
        "question": "Explain the RAG architecture in MindCare AI",
        "expected_keywords": ["RAG", "ChromaDB", "semantic", "BM25"],
        "expected_intent": "ARCHITECTURE_INTENT",
        "description": "RAG architecture deep-dive",
    },
    {
        "id": 11,
        "question": "explain the noisesence",
        "expected_keywords": ["NoiseSense", "YAMNet"],
        "expected_intent": "PROJECT_INTENT",
        "description": "Typo test for NoiseSense ('noisesence')",
    },
    {
        "id": 12,
        "question": "explain vibecodeer",
        "expected_keywords": ["IDE", "VibeCoder"],
        "expected_intent": "PROJECT_INTENT",
        "description": "Typo test for VibeCoder ('vibecodeer')",
    },
    {
        "id": 13,
        "question": "Why should we hire you?",
        "expected_keywords": ["AI", "Adarsh"],
        "expected_intent": "HR_INTENT",
        "description": "HR query — Why hire Adarsh / value proposition",
    },
    {
        "id": 14,
        "question": "What are your strengths and weaknesses?",
        "expected_keywords": ["strength", "weakness"],
        "expected_intent": "HR_INTENT",
        "description": "HR query — Strengths & weaknesses",
    },
]


# ──────────────────────────────────────────────────────────────────────────────
# HTTP Helper (uses stdlib only — no extra deps)
# ──────────────────────────────────────────────────────────────────────────────

def chat(session_id: str, question: str, timeout: int = 30) -> tuple[str, str | None]:
    """
    Send a question to the API and collect the full streamed response.
    Returns (full_response_text, intent_detected)
    """
    body = json.dumps({"session_id": session_id, "message": question}).encode("utf-8")
    req = urllib.request.Request(
        f"{API_URL}/api/chat",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    full_text = []
    detected_intent = None

    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            for raw_line in resp:
                line = raw_line.decode("utf-8", errors="replace").strip()
                if not line or line == "data: [DONE]":
                    continue
                if line.startswith("data: "):
                    try:
                        data = json.loads(line[6:])
                        if "token" in data:
                            full_text.append(data["token"])
                        if "intent" in data:
                            detected_intent = data["intent"]
                    except json.JSONDecodeError:
                        pass
    except urllib.error.URLError as e:
        return f"[CONNECTION ERROR: {e}]", None

    return "".join(full_text), detected_intent


def check_health() -> bool:
    try:
        with urllib.request.urlopen(f"{API_URL}/health", timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("status") == "ok"
    except Exception:
        return False


# ──────────────────────────────────────────────────────────────────────────────
# Test Runner
# ──────────────────────────────────────────────────────────────────────────────

def run_tests():
    print("=" * 70)
    print("  Ask Adarsh AI -- Test Suite")
    print("=" * 70)
    print()

    # Health check
    print("Checking API health...", end=" ")
    if not check_health():
        print("FAILED")
        print()
        print("ERROR: API is not running at http://localhost:8000")
        print("Start the server with:")
        print("  cd api")
        print("  .\\venv\\Scripts\\uvicorn main:app --host 0.0.0.0 --port 8000 --reload")
        sys.exit(1)
    print("OK")
    print()

    passed = 0
    failed = 0
    results = []

    for tc in TEST_CASES:
        print(f"Test {tc['id']:2d}: {tc['description']}")
        print(f"         Q: {tc['question']}")

        start = time.time()
        response, intent = chat(f"test-session-{tc['id']}", tc["question"])
        elapsed = time.time() - start

        # Keyword checks (case-insensitive)
        response_lower = response.lower()
        missing_kw = [
            kw for kw in tc["expected_keywords"]
            if kw.lower() not in response_lower
        ]

        # Intent check
        intent_ok = (intent == tc["expected_intent"]) if intent else None

        # Overall pass/fail
        kw_ok = len(missing_kw) == 0
        overall_pass = kw_ok  # Intent is informational only

        if overall_pass:
            status = "PASS"
            passed += 1
        else:
            status = "FAIL"
            failed += 1

        print(f"         Status : {status}  ({elapsed:.1f}s)")
        print(f"         Intent : {intent or 'N/A'} (expected: {tc['expected_intent']}) {'OK' if intent_ok else 'MISMATCH' if intent_ok is False else ''}")

        if missing_kw:
            print(f"         Missing keywords: {missing_kw}")

        # Show first 200 chars of response
        preview = response[:200].replace("\n", " ")
        print(f"         Response preview: {preview}...")
        print()

        results.append({
            "id": tc["id"],
            "passed": overall_pass,
            "intent_match": intent_ok,
            "elapsed": elapsed,
            "missing_keywords": missing_kw,
        })

    # Summary
    print("=" * 70)
    print(f"  Results: {passed} PASSED / {failed} FAILED / {len(TEST_CASES)} TOTAL")

    avg_time = sum(r["elapsed"] for r in results) / len(results)
    print(f"  Average response time: {avg_time:.1f}s")

    intent_matches = sum(1 for r in results if r["intent_match"])
    print(f"  Intent classification: {intent_matches}/{len(TEST_CASES)} correct")

    print("=" * 70)

    if failed == 0:
        print()
        print("  All tests passed! Ask Adarsh AI is working correctly.")
    else:
        print()
        print(f"  {failed} test(s) failed. Check responses above.")

    return failed == 0


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
