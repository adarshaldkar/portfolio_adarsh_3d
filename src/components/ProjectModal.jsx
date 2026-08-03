import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { github, live } from "../assets";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#1d1836] border border-[#915EFF44] rounded-3xl shadow-[0_0_50px_#915EFF33] overflow-hidden my-8 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar / Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff15] bg-[#151030]">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold tracking-wider text-white bg-[#915EFF] px-3 py-1 rounded-full uppercase">
                {project.category || "Featured Project"}
              </span>
              {project.date && (
                <span className="text-[12px] text-secondary">
                  {project.date}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#ffffff10] hover:bg-[#915EFF] text-white flex items-center justify-center transition-all duration-200"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Project Image Banner */}
            <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden group">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1836] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap justify-between items-end gap-3">
                <h2 className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide">
                  {project.name}
                </h2>
              </div>
            </div>

            {/* Tags Grid */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags?.map((tag) => (
                <span
                  key={`${project.name}-${tag.name}`}
                  className={`text-[13px] font-medium ${tag.color} bg-[#ffffff0c] px-3.5 py-1.5 rounded-full border border-[#ffffff10]`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Long Description & Technical Accomplishments */}
            <div className="space-y-4 text-white-100 text-[15px] leading-[28px]">
              <h3 className="text-[#915EFF] font-bold text-lg border-b border-[#ffffff10] pb-2">
                System Overview & Architecture
              </h3>
              <p className="whitespace-pre-line text-secondary text-[15px] leading-7">
                {project.details?.longDescription || project.description}
              </p>

              {/* Technical Highlights Bullet List */}
              {project.details?.highlights && (
                <div className="mt-4 bg-[#151030] p-5 rounded-2xl border border-[#ffffff0a]">
                  <h4 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
                    ⚡ Key Technical Accomplishments
                  </h4>
                  <ul className="space-y-2.5">
                    {project.details.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-secondary text-sm">
                        <span className="text-[#915EFF] font-bold mt-0.5">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer / Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-[#ffffff15] bg-[#151030]">
            <div className="text-xs text-secondary">
              {project.client && <span>Client/Context: <strong className="text-white">{project.client}</strong></span>}
            </div>

            <div className="flex items-center gap-4">
              {project.source_code_link && (
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#ffffff10] hover:bg-[#ffffff20] text-white text-sm font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <img src={github} alt="github" className="w-4 h-4 object-contain mix-blend-color-dodge" />
                  View GitHub Code
                </a>
              )}

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#915EFF] hover:bg-[#7c4de0] text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_15px_#915EFF66]"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
