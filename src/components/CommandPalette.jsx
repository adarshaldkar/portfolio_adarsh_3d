import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaProjectDiagram, FaFilePdf, FaGithub, FaLinkedin, FaTelegram, FaTimes, FaPalette } from "react-icons/fa";

const COMMANDS = [
  {
    id: "mindcare",
    title: "MindCare AI — Agentic Mental Health RAG",
    category: "Projects",
    icon: <FaProjectDiagram className="text-[#915EFF]" />,
    action: () => window.open("/project/mindcare", "_blank"),
  },
  {
    id: "noisesense",
    title: "NoiseSense — Acoustic IoT ML Pipeline",
    category: "Projects",
    icon: <FaProjectDiagram className="text-[#00cea8]" />,
    action: () => window.open("/project/noisesense", "_blank"),
  },
  {
    id: "vibecoder",
    title: "VibeCoder — Cloud Browser IDE",
    category: "Projects",
    icon: <FaProjectDiagram className="text-[#646CFF]" />,
    action: () => window.open("/project/vibecoder", "_blank"),
  },
  {
    id: "resume",
    title: "Download Resume PDF",
    category: "Quick Actions",
    icon: <FaFilePdf className="text-red-400" />,
    action: () => window.open("/resume.pdf", "_blank"),
  },
  {
    id: "github",
    title: "View GitHub Profile (34 Repositories)",
    category: "Social Links",
    icon: <FaGithub className="text-white" />,
    action: () => window.open("https://github.com/adarshaldkar", "_blank"),
  },
  {
    id: "linkedin",
    title: "Connect on LinkedIn",
    category: "Social Links",
    icon: <FaLinkedin className="text-blue-400" />,
    action: () => window.open("https://www.linkedin.com/in/adarsh-patel14", "_blank"),
  },
  {
    id: "telegram",
    title: "Send Instant Message on Telegram",
    category: "Contact",
    icon: <FaTelegram className="text-sky-400" />,
    action: () => window.open("https://t.me/adarsh_portfolio_14_bot", "_blank"),
  },
];

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setSearch("");
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter" && filteredCommands.length > 0) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl bg-[#0f1424] border border-[#ffffff18] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#ffffff10]">
            <FaSearch className="text-[#915EFF] text-lg" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, resume, links... (Press Esc to close)"
              className="w-full bg-transparent text-white text-base outline-none placeholder:text-secondary font-medium"
              autoFocus
            />
            <button
              onClick={onClose}
              className="text-secondary hover:text-white transition-colors p-1"
            >
              <FaTimes />
            </button>
          </div>

          {/* Command List */}
          <div className="max-h-[350px] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-secondary text-sm">
                No matching results found for "{search}"
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    idx === selectedIndex
                      ? "bg-[#915EFF33] border border-[#915EFF66] text-white"
                      : "hover:bg-[#ffffff08] text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cmd.icon}</span>
                    <span className="text-sm font-medium">{cmd.title}</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-secondary bg-[#ffffff0a] px-2 py-0.5 rounded-md">
                    {cmd.category}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Footer hints */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-[#050816] text-[12px] text-secondary border-t border-[#ffffff0a]">
            <span className="flex items-center gap-2">
              <kbd className="bg-[#1d1836] px-1.5 py-0.5 rounded text-[10px] text-white font-mono">↑↓</kbd> Navigate
              <kbd className="bg-[#1d1836] px-1.5 py-0.5 rounded text-[10px] text-white font-mono">↵</kbd> Select
              <kbd className="bg-[#1d1836] px-1.5 py-0.5 rounded text-[10px] text-white font-mono">esc</kbd> Close
            </span>
            <span>Raycast Spotlight</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
