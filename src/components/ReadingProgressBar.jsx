import React, { useEffect, useState } from "react";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9998] bg-transparent">
      <div
        className="h-full transition-all duration-75 ease-linear rounded-r-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #915EFF, #00cea8, #bf61ff)",
          boxShadow: "0 0 10px #915EFF88, 0 0 20px #915EFF44",
        }}
      />
    </div>
  );
};

export default ReadingProgressBar;
