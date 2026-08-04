import { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_AI_API_URL || "http://localhost:8000";

const PRESET_CHIPS = [
  "Tell me about MindCare AI",
  "Explain the RAG architecture",
  "Which project is the strongest?",
  "What are his hackathon rankings?",
  "Why not LangChain?",
  "What is his tech stack?",
  "Tell me about NoiseSense",
  "How to contact Adarsh?",
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content: `Hi! I'm **Adarsh AI** — your guide to Adarsh Patel's projects, AI systems, architecture, experience, and achievements.

Powered by a custom **Planner → Capability → Prompt → LLM** runtime — the same architecture as MindCare AI, built without LangChain.

Feel free to ask me anything about his work, technical decisions, or career journey. 👇`,
};

function generateSessionId() {
  const stored = localStorage.getItem("adarsh_ai_session");
  if (stored) return stored;
  const id = "sess_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  localStorage.setItem("adarsh_ai_session", id);
  return id;
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#915EFF",
            animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function MessageContent({ content }) {
  // Simple markdown-ish rendering
  const renderContent = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Italic
      line = line.replace(/_(.*?)_/g, "<em>$1</em>");
      // Code inline
      line = line.replace(/`(.*?)`/g, '<code style="background:rgba(145,94,255,0.15);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.85em">$1</code>');

      if (line.startsWith("```")) return null;
      if (line === "---") return <hr key={i} style={{ borderColor: "rgba(255,255,255,0.1)", margin: "8px 0" }} />;
      if (line.startsWith("# ")) return <h3 key={i} style={{ color: "#fff", margin: "8px 0 4px", fontSize: "1rem" }} dangerouslySetInnerHTML={{ __html: line.slice(2) }} />;

      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: line }} />
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return <div style={{ lineHeight: 1.65, fontSize: "0.875rem" }}>{renderContent(content)}</div>;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [sessionId] = useState(generateSessionId);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const query = text || input.trim();
    if (!query || isLoading) return;

    setInput("");
    setShowChips(false);
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: query }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setIsLoading(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.token) {
                assistantMessage += data.token;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantMessage,
                  };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please make sure the backend is running on port 8000. You can reach Adarsh directly at **adarshaldkar@gmail.com**.",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Inject keyframe for typing dots */}
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(145,94,255,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(145,94,255,0); }
        }
        .chat-msg-user { animation: chatSlideIn 0.2s ease; }
        .chat-msg-assistant { animation: chatSlideIn 0.2s ease; }
        .chip-btn:hover { background: rgba(145,94,255,0.25) !important; border-color: #915EFF !important; }
        .send-btn:hover { background: #7a4de0 !important; }
        .close-btn:hover { background: rgba(255,255,255,0.1) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(145,94,255,0.4); border-radius: 4px; }
      `}</style>

      {/* Floating Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Adarsh AI Assistant"
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9999,
            background: "linear-gradient(135deg, #915EFF 0%, #6d3fcf 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            padding: "14px 22px",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "inherit",
            animation: "badgePulse 2.5s ease-in-out infinite",
            boxShadow: "0 8px 32px rgba(145,94,255,0.45)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={{ fontSize: "1.1rem" }}>🤖</span>
          Ask Adarsh AI
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            width: 400,
            maxWidth: "calc(100vw - 32px)",
            height: "min(600px, calc(100vh - 40px))",
            maxHeight: "calc(100vh - 40px)",
            display: "flex",
            flexDirection: "column",
            background: "rgba(14, 10, 30, 0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(145,94,255,0.35)",
            borderRadius: 20,
            boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(145,94,255,0.1)",
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            animation: "chatSlideIn 0.3s ease",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 18px",
              borderBottom: "1px solid rgba(145,94,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(145,94,255,0.15) 0%, rgba(109,63,207,0.08) 100%)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #915EFF, #6d3fcf)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2 }}>
                  Ask Adarsh AI
                </div>
                <div style={{ color: "#915EFF", fontSize: "0.72rem", fontWeight: 500 }}>
                  Portfolio AI Assistant
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  padding: "4px 8px",
                  borderRadius: 6,
                  transition: "background 0.2s",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "chat-msg-user" : "chat-msg-assistant"}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #915EFF, #6d3fcf)"
                        : "rgba(255,255,255,0.05)",
                    border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                  }}
                >
                  {msg.content === "" ? (
                    <TypingDots />
                  ) : (
                    <MessageContent content={msg.content} />
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Preset Chips */}
            {showChips && messages.length === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                <div style={{ color: "#aaa", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>
                  Quick Questions
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {PRESET_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      className="chip-btn"
                      onClick={() => sendMessage(chip)}
                      style={{
                        background: "rgba(145,94,255,0.1)",
                        border: "1px solid rgba(145,94,255,0.3)",
                        borderRadius: 20,
                        color: "#c4b5fd",
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontFamily: "inherit",
                        fontWeight: 500,
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(145,94,255,0.15)",
              background: "rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "flex-end",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(145,94,255,0.25)",
                borderRadius: 14,
                padding: "8px 12px",
                transition: "border-color 0.2s",
              }}
              onFocus={() => {}}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Adarsh's projects, skills, experience..."
                rows={1}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  resize: "none",
                  lineHeight: 1.5,
                  maxHeight: 80,
                  overflowY: "auto",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
                }}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                title="Send"
                style={{
                  background: input.trim() && !isLoading ? "#915EFF" : "rgba(145,94,255,0.3)",
                  border: "none",
                  borderRadius: 10,
                  color: "#fff",
                  cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                  padding: "8px 12px",
                  fontSize: "1rem",
                  transition: "background 0.2s",
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                →
              </button>
            </div>

            {/* Caption */}
            <div
              style={{
                marginTop: 8,
                textAlign: "center",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.63rem",
                lineHeight: 1.4,
              }}
            >
              Custom AI runtime · Intent Planning · Capability Routing · Memory · Streaming
              <br />
              Built without LangChain — same architecture as MindCare AI
            </div>
          </div>
        </div>
      )}
    </>
  );
}
