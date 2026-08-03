"""
Architecture Capability.
Deep-dive technical explanations of Adarsh's AI system architectures.
"""

from .base import BaseCapability

ARCHITECTURE_KNOWLEDGE = {
    "adaptive_runtime": """
**MindCare AI — Adaptive Runtime Engine**

Adarsh's most sophisticated architectural contribution. Built entirely without LangChain.

```
User Query
    ↓
Intent Planner (keyword + pattern classification)
    ↓
Execution Plan (ordered capability list)
    ↓
Capability Executor (routes to correct module)
    ↓
Hybrid RAG Retriever (BM25 keyword + ChromaDB semantic)
    ↓
Context Builder (retrieved docs + conversation memory)
    ↓
Prompt Builder (system prompt + context + history → final prompt)
    ↓
LLM Router (selects optimal model based on query complexity)
    ↓
Streaming Response
    ↓
Evaluator (quality gate — scores accuracy, safety, empathy)
    ↓
Delivered to User
```

**Why no LangChain?**
Full control over latency, memory management, capability routing, and error handling. The custom runtime is also reusable — Adarsh applied the same pattern to this portfolio assistant.
""",

    "hybrid_rag": """
**Hybrid RAG Architecture (MindCare AI)**

Classic pure semantic search misses exact keyword matches. Hybrid solves this.

```
User Query
    ↓
Parallel Retrieval:
  ├── BM25 (keyword search)    → exact term matches
  └── ChromaDB (semantic)     → conceptual similarity
    ↓
Reciprocal Rank Fusion (combines both result sets)
    ↓
Top-K Chunks (ranked by combined score)
    ↓
Context Assembly
    ↓
LLM (grounded answer)
```

**Result:** 23% higher precision than pure semantic search on mental health knowledge retrieval.
**Why BM25 matters:** Medication names, specific technique names (CBT, DBT), and exact terminology need keyword matching — semantic embeddings alone miss these.
""",

    "noisesense_pipeline": """
**NoiseSense — IoT Acoustic Pipeline**

```
Audio Capture (Raspberry Pi / Microphone)
    ↓
DSP Feature Extraction (MFCC / Mel-Spectrogram)
    ↓
YAMNet ML Inference (521 AudioSet categories, edge device)
    ↓
MQTT Publish (Mosquitto broker, sub-50ms latency)
    ↓
InfluxDB Write (time-series, GPS-tagged events)
    ↓
Grafana Dashboard (real-time heatmaps)
    ↓
Gemini AI (automated forensic PDF reports)
```

**Key design decisions:**
- Edge inference (on-device) to minimize bandwidth usage
- MQTT pub-sub for IoT-grade low-latency event transport
- InfluxDB for high-frequency time-series write performance
- Offline buffer for 100% data recovery on reconnect
""",

    "mcp": """
**Model Context Protocol (MCP) in MindCare AI**

MCP standardizes how capability modules communicate with the runtime core.

```
Runtime Core
    │
    ├── [MCP Interface]
    │       ↓
    ├── Crisis Capability
    ├── Mood Journal Capability
    ├── CBT Exercise Capability
    ├── Breathing Technique Capability
    └── General Support Capability
```

**Why MCP?**
- Hot-swap capabilities without restarting the system
- Standard interface enables easy addition of new capabilities
- Follows Open-Closed Principle: extend without modifying core
- Enables independent capability testing
""",

    "portfolio_runtime": """
**Ask Adarsh AI — Portfolio Runtime Architecture**

This very assistant runs on a custom planner-driven runtime:

```
Recruiter Question
    ↓
Intent Classifier (keyword pattern matching — zero LLM calls)
    ↓
Execution Plan (intent → ordered capability list)
    ↓
Capability Executor (routes to knowledge modules)
    ↓
Context Builder (capability output + conversation memory)
    ↓
Prompt Builder (17-section system prompt + context + history)
    ↓
OpenRouter (Llama 3.1 8B, temperature=0.2)
    ↓
SSE Streaming → React Frontend (typewriter effect)
```

**Same pattern as MindCare AI.** The difference: simplified for a portfolio use case, without evaluation layer and with structured JSON knowledge instead of vector retrieval.
""",

    "general": """
**Adarsh's AI Architecture Philosophy**

Adarsh designs AI systems with these principles:

1. **No Black Boxes** — Custom runtimes over framework abstractions (LangChain) for full observability
2. **Intent-First** — Always classify what the user needs before retrieving context
3. **Minimum Context** — Retrieve only relevant knowledge; never flood the LLM with irrelevant data
4. **Grounding** — LLM responses are always anchored to retrieved context; hallucination is a failure mode
5. **Streaming** — Always stream responses for better UX perception
6. **Evaluation** — Production AI systems need quality gates, not just generation

**Recurring patterns across his projects:**
- Planner → Capability → Context → Prompt → LLM → Stream
- Hybrid retrieval (keyword + semantic) over pure vector search
- Session-scoped memory without external database dependency
- Provider abstraction for LLM switching without code changes
"""
}


class ArchitectureCapability(BaseCapability):
    name = "architecture"

    def retrieve(self, query: str) -> str:
        query_lower = query.lower()

        if any(k in query_lower for k in ["adaptive runtime", "mindcare runtime", "custom runtime", "no langchain", "without langchain", "langchain"]):
            return ARCHITECTURE_KNOWLEDGE["adaptive_runtime"]

        if any(k in query_lower for k in ["hybrid rag", "rag architecture", "retrieval", "chromadb", "bm25", "semantic search", "vector"]):
            return ARCHITECTURE_KNOWLEDGE["hybrid_rag"]

        if any(k in query_lower for k in ["noisesense pipeline", "iot pipeline", "acoustic pipeline", "mqtt pipeline"]):
            return ARCHITECTURE_KNOWLEDGE["noisesense_pipeline"]

        if any(k in query_lower for k in ["mcp", "model context protocol", "capability protocol"]):
            return ARCHITECTURE_KNOWLEDGE["mcp"]

        if any(k in query_lower for k in ["portfolio assistant", "this chatbot", "this assistant", "ask adarsh", "how are you built", "how does this work"]):
            return ARCHITECTURE_KNOWLEDGE["portfolio_runtime"]

        # General architecture question
        return ARCHITECTURE_KNOWLEDGE["general"]
