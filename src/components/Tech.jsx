import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import SpaceAsteroid from "./canvas/SpaceAsteroid";

// Each tech icon orbits like a constellation node
const TechOrb = ({ technology, index, total }) => {
  const [hovered, setHovered] = useState(false);

  // Arrange in offset rows like asteroids in a belt
  const cols = 5;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const offset = row % 2 === 1 ? 0.5 : 0; // stagger odd rows

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "backOut" }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-2 group"
    >
      {/* Glow orb container */}
      <motion.div
        animate={hovered ? { y: -8, scale: 1.15 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: hovered
            ? "radial-gradient(circle, rgba(145,94,255,0.25) 0%, rgba(0,206,168,0.08) 60%, transparent 100%)"
            : "radial-gradient(circle, rgba(145,94,255,0.08) 0%, transparent 70%)",
          border: hovered ? "1px solid rgba(145,94,255,0.5)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: hovered ? "0 0 20px rgba(145,94,255,0.4), 0 0 40px rgba(145,94,255,0.15)" : "none",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Spinning ring on hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, #915EFF44, transparent, #00cea844, transparent)",
            }}
          />
        )}

        <img
          src={technology.icon}
          alt={technology.name}
          className="w-11 h-11 object-contain relative z-10"
          style={{ filter: hovered ? "drop-shadow(0 0 6px #915EFF88)" : "none", transition: "filter 0.3s" }}
        />

        {/* Floating particle dots */}
        {hovered &&
          [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#915EFF]"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, (i - 1) * 18],
                y: [0, -20 - i * 5],
              }}
              transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
      </motion.div>

      {/* Tech name label */}
      <motion.span
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 4 }}
        transition={{ duration: 0.2 }}
        className="text-[11px] font-medium text-secondary text-center max-w-[72px] leading-tight"
      >
        {technology.name}
      </motion.span>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <div className="mt-4">
      {/* Section header with space flavor */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="text-secondary text-sm tracking-[4px] uppercase mb-2">Technology Arsenal</p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#915EFF]" />
          <span className="text-white/20 text-lg">✦</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#915EFF]" />
        </div>
      </motion.div>

      {/* Two-column: Asteroid 3D + Tech Orbs */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left: 3D Space Asteroid */}
        <div className="lg:w-[320px] flex-shrink-0 relative">
          <SpaceAsteroid />
          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-[11px] text-secondary mt-2 tracking-wider"
          >
            🛸 Exploring the tech cosmos
          </motion.p>
        </div>

        {/* Right: Tech Icon Constellation */}
        <div className="flex-1 relative">
          {/* Subtle grid glow behind icons */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #915EFF22 0%, transparent 70%)",
            }}
          />

          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-4 relative z-10">
            {technologies.map((technology, index) => (
              <TechOrb
                key={technology.name}
                technology={technology}
                index={index}
                total={technologies.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
