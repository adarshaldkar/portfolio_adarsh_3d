import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AmbientSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolume, setShowVolume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // Lo-fi free public domain stream from mixkit / lofi.co
  const LOFI_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

  useEffect(() => {
    const audio = new Audio(LOFI_URL);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        console.warn("Audio autoplay blocked:", e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-16 left-3 sm:bottom-20 sm:left-6 z-40 flex flex-col-reverse items-start gap-2">
      {/* Volume slider pop-up */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0f1424]/95 backdrop-blur-md border border-[#ffffff15] px-4 py-3 rounded-2xl shadow-xl"
          >
            <p className="text-secondary text-[10px] mb-2 text-center font-medium">Volume</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 accent-[#915EFF]"
              style={{ cursor: 'pointer' }}
            />
            <p className="text-[#915EFF] text-[10px] text-center mt-1 font-bold">
              {Math.round(volume * 100)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button — sits LEFT of the AI chatbot button */}
      <motion.button
        onClick={togglePlay}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowVolume((v) => !v);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-all duration-300 ${
          isPlaying
            ? "bg-[#915EFF] border-[#915EFF] shadow-[0_0_20px_#915EFF66]"
            : "bg-[#0f1424]/90 backdrop-blur-md border-[#ffffff20] hover:border-[#915EFF66]"
        }`}
        title={isPlaying ? "Pause lo-fi (right-click for volume)" : "Play ambient lo-fi music"}
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#915EFF] opacity-30" />
        )}

        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : isPlaying ? (
          // Pause icon (animated bars)
          <div className="flex items-end gap-0.5 h-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ["6px", "18px", "8px", "20px", "6px"] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                className="w-1 bg-white rounded-full"
                style={{ minHeight: "6px" }}
              />
            ))}
          </div>
        ) : (
          // Speaker icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0-12L8 9H5a1 1 0 00-1 1v4a1 1 0 001 1h3l4 3V6z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default AmbientSound;
