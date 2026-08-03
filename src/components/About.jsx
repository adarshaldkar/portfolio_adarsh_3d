import React from "react";
import { Tilt } from 'react-tilt';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa6";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.4, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-8 min-h-[260px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[19px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Full Stack Engineer | AI Systems</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-4xl leading-[32px] space-y-4"
      >
        <p>
          I am <span className="text-[#915EFF] font-bold">Adarsh Patel</span>, a B.Tech ECE graduate (2022–2026, CGPA 7.7/10) from MVIT Puducherry building AI-powered systems and full-stack applications with real production depth.
        </p>
        <p>
          I do not just learn frameworks — I build with them. <span className="text-white font-semibold">MindCare AI</span> is a multi-source psychiatric RAG assistant with agentic orchestration and local STT. <span className="text-white font-semibold">VibeCoder</span> is a browser-based cloud IDE built from scratch with sub-second AI autocomplete. <span className="text-white font-semibold">NoiseSense</span> is a distributed IoT acoustic pipeline classifying 521 sound categories in real time. <span className="text-white font-semibold">Smart Industry 4.0</span> is a physical factory digital twin built for the Unisys Innovation Program, where we ranked <span className="text-[#915EFF] font-bold">Top 24 out of 8,000+</span> projects.
        </p>
        <p>
          I interned as a Full Stack Engineer at <span className="text-[#915EFF] font-semibold">Planarc</span>, built a <span className="text-[#915EFF] font-semibold">Loan Verification Management System (LVMS)</span> for a fintech client, and have solved <span className="text-[#915EFF] font-bold">400+ LeetCode</span> problems across algorithms and data structures.
        </p>
        <p className="text-white font-medium italic">
          "I care about systems that actually work — grounded generation, sub-second latency, zero hallucination, and production reliability."
        </p>
      </motion.div>

      {/* Quick Contact Bar */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        className="mt-8 flex flex-wrap items-center gap-6 pt-4 border-t border-[#ffffff10]"
      >
        <a
          href="mailto:adarshaldkar@gmail.com"
          className="flex items-center gap-2 text-sm text-secondary hover:text-[#915EFF] transition-colors"
        >
          <FaEnvelope className="text-[#915EFF]" /> adarshaldkar@gmail.com
        </a>
        <a
          href="tel:+917010664806"
          className="flex items-center gap-2 text-sm text-secondary hover:text-[#915EFF] transition-colors"
        >
          <FaPhone className="text-[#915EFF]" /> +91 7010664806
        </a>
        <a
          href="https://www.linkedin.com/in/adarsh-patel14"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-secondary hover:text-[#915EFF] transition-colors"
        >
          <FaLinkedin className="text-[#915EFF]" /> LinkedIn
        </a>
        <a
          href="https://github.com/adarshaldkar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-secondary hover:text-[#915EFF] transition-colors"
        >
          <FaGithub className="text-[#915EFF]" /> GitHub
        </a>
      </motion.div>

      {/* Core Expertise Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
