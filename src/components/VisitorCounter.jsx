import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Use localStorage to track + simulate a live counter
    const stored = localStorage.getItem("portfolio_visit_count");
    const lastVisit = localStorage.getItem("portfolio_last_visit");
    const now = Date.now();

    // Base seed: randomized starting count so it looks realistic
    const BASE_COUNT = 1247;

    let currentCount = stored ? parseInt(stored, 10) : BASE_COUNT;

    // Only increment once per session (not every page reload)
    const isNewSession = !lastVisit || now - parseInt(lastVisit, 10) > 30 * 60 * 1000;
    if (isNewSession) {
      currentCount += 1;
      setIsNew(true);
      localStorage.setItem("portfolio_last_visit", String(now));
    }

    localStorage.setItem("portfolio_visit_count", String(currentCount));
    setCount(currentCount);

    // Auto-hide after 8 seconds
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (count === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-40 left-6 z-40 flex items-center gap-2.5 bg-[#0f1424]/90 backdrop-blur-md border border-[#ffffff15] px-4 py-2.5 rounded-2xl shadow-2xl"
        >
          {/* Eye icon */}
          <div className="text-[#915EFF] text-lg">👁️</div>
          <div>
            <p className="text-white text-xs font-bold">
              You are visitor{" "}
              <span className="text-[#915EFF] font-black">#{count.toLocaleString()}</span>
            </p>
            {isNew && (
              <p className="text-emerald-400 text-[10px] font-medium mt-0.5">
                ✨ Welcome! Thanks for stopping by.
              </p>
            )}
            {!isNew && (
              <p className="text-secondary text-[10px] mt-0.5">
                Welcome back! 👋
              </p>
            )}
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-secondary hover:text-white text-xs ml-1 transition-colors"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisitorCounter;
