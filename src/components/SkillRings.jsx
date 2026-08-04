import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "Python / FastAPI", pct: 92, color: "#3b82f6" },
  { name: "React / Next.js", pct: 88, color: "#06b6d4" },
  { name: "LLM / RAG Systems", pct: 90, color: "#915EFF" },
  { name: "Node.js / Express", pct: 82, color: "#10b981" },
  { name: "Docker / DevOps", pct: 75, color: "#f59e0b" },
  { name: "ML / Data Science", pct: 80, color: "#ec4899" },
];

const CircleRing = ({ pct, color, size = 80 }) => {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const [animated, setAnimated] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = () => {
            start += 2;
            if (start <= pct) {
              setAnimated(start);
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct]);

  const offset = circ - (animated / 100) * circ;

  return (
    <svg ref={ref} width={size} height={size}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={8}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          filter: `drop-shadow(0 0 6px ${color}88)`,
          transition: "stroke-dashoffset 0.03s linear",
        }}
      />
      {/* Percentage text */}
      <text
        x={size / 2}
        y={size / 2 + 5}
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="inherit"
      >
        {animated}%
      </text>
    </svg>
  );
};

const SkillRings = () => {
  return (
    <div className="mt-10">
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-secondary text-sm tracking-[4px] uppercase mb-6 text-center"
      >
        Skill Proficiency
      </motion.p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-items-center">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "backOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2"
          >
            <CircleRing pct={skill.pct} color={skill.color} size={88} />
            <span className="text-[11px] text-secondary text-center font-medium leading-tight max-w-[70px]">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillRings;
