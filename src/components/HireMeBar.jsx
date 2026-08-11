import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HireMeBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("hire_me_dismissed");
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  // Hide when within 200px of page bottom (footer area)
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setNearFooter(pageHeight - scrollBottom < 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("hire_me_dismissed", "1");
  };

  return (
    <AnimatePresence>
      {visible && !nearFooter && (
        <motion.div
          initial={{ y: 60, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 60, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className="hidden sm:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[9980] items-center justify-between gap-3 px-5 py-2.5 rounded-full w-[90%] max-w-lg border border-[#915EFF55] bg-[#0a061e]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(145,94,255,0.25)]"
        >
          {/* Status indicator + title */}
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="truncate">
              <p className="text-white text-xs font-semibold leading-tight flex items-center gap-1.5 truncate">
                <span>Open for Hire</span>
                <span className="text-[#00cea8] text-[10px] font-bold uppercase tracking-wider hidden xs:inline">· Full-time / Remote</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="mailto:adarshaldkar@gmail.com"
              className="px-3.5 py-1.5 rounded-full bg-[#915EFF] text-white text-xs font-bold hover:bg-[#7c4de0] transition-all duration-200 shadow-[0_0_12px_#915EFF66] flex items-center gap-1"
            >
              ✉️ Hire
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full border border-[#ffffff20] text-gray-200 text-xs font-medium hover:bg-[#ffffff15] transition-all duration-200 hidden sm:inline"
            >
              Resume
            </a>
            <button
              onClick={handleDismiss}
              className="text-secondary hover:text-white text-xs transition-colors p-1"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HireMeBar;
