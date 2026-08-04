import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const DEVLOGS = [
  {
    id: 1,
    emoji: "🧠",
    tag: "Architecture Deep-Dive",
    tagColor: "#915EFF",
    title: "MindCare AI — Building a Psychiatric RAG Without LangChain",
    summary:
      "How I designed a custom Planner → Capability → Prompt → LLM runtime that outperforms LangChain in token efficiency and latency. Covers multi-source retrieval, ChromaDB vector stores, and local STT integration.",
    readTime: "8 min read",
    date: "Jul 2025",
    link: "/project/mindcare",
  },
  {
    id: 2,
    emoji: "📡",
    tag: "IoT × ML Pipeline",
    tagColor: "#00cea8",
    title: "NoiseSense — Classifying 521 Sound Categories in Real Time",
    summary:
      "The full journey of building a distributed acoustic ML pipeline on Raspberry Pi — from feature engineering on raw audio to deploying a YAMNet-based model that hits sub-200ms inference latency on edge hardware.",
    readTime: "6 min read",
    date: "Jun 2025",
    link: "/project/noisesense",
  },
  {
    id: 3,
    emoji: "💻",
    tag: "Cloud IDE Build Log",
    tagColor: "#06b6d4",
    title: "VibeCoder — A Browser IDE with Sub-Second AI Autocomplete",
    summary:
      "From Monaco Editor integration to containerised code execution via Docker sandbox to streaming Groq completions — the full architecture of a cloud browser IDE built from scratch without Firebase or Replit's approach.",
    readTime: "10 min read",
    date: "May 2025",
    link: "/project/vibecoder",
  },
];

const DevlogSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto" id="devlog">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-secondary text-sm tracking-[4px] uppercase mb-3">
          What I'm Building
        </p>
        <h2 className="text-white text-[34px] sm:text-[44px] font-black leading-tight">
          Dev<span className="text-[#915EFF]">log</span>
        </h2>
        <p className="text-secondary mt-2 text-sm max-w-md mx-auto">
          Architecture breakdowns, build journeys, and technical decisions behind my projects.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEVLOGS.map((post, i) => (
          <motion.a
            key={post.id}
            href={post.link}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative bg-[#0f1424]/80 backdrop-blur-md border border-[#ffffff0a] rounded-2xl p-6 overflow-hidden flex flex-col gap-4 hover:border-[#915EFF44] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(145,94,255,0.15)]"
          >
            {/* Subtle glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${post.tagColor}15 0%, transparent 60%)`,
              }}
            />

            {/* Emoji + Tag */}
            <div className="flex items-center justify-between">
              <span className="text-3xl">{post.emoji}</span>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  color: post.tagColor,
                  backgroundColor: `${post.tagColor}18`,
                  border: `1px solid ${post.tagColor}44`,
                }}
              >
                {post.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-white font-bold text-[15px] leading-snug group-hover:text-[#915EFF] transition-colors">
              {post.title}
            </h3>

            {/* Summary */}
            <p className="text-secondary text-[13px] leading-relaxed flex-1">
              {post.summary}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#ffffff08]">
              <div className="flex items-center gap-3 text-[11px] text-secondary">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <FaExternalLinkAlt
                className="text-secondary group-hover:text-[#915EFF] transition-colors text-xs"
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default DevlogSection;
