import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="z-30 relative pointer-events-auto max-w-3xl">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className='text-[#915EFF]'>Adarsh</span>
          </h1>

          <div className="mt-2 text-[#915EFF] font-semibold text-lg sm:text-xl tracking-wide">
            <TypeAnimation
              sequence={[
                "AI Engineer",
                2000,
                "LLM Systems & RAG Architect",
                2000,
                "Agentic AI Developer",
                2000,
                "Full Stack Web Engineer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </div>

          <p className="mt-3 text-white-100 text-[15px] sm:text-[17px] leading-[26px] font-medium max-w-2xl">
            I build AI systems and full stack products that work in production — from a browser IDE with sub-second AI autocomplete to distributed acoustic ML pipelines classifying 521 sound categories in real time.
          </p>

          {/* 3 Stat Badges (No Emojis, No Colored Highlights) */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="bg-[#1d1836] border border-[#ffffff15] px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <span className="text-white font-bold text-sm">Top 78 / 19,000+</span>
              <span className="text-secondary text-xs hidden sm:inline">Odoo Hackathon 2025</span>
            </div>

            <div className="bg-[#1d1836] border border-[#ffffff15] px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <span className="text-white font-bold text-sm">Top 24 / 8,000+</span>
              <span className="text-secondary text-xs hidden sm:inline">Unisys Innovation 2025</span>
            </div>

            <div className="bg-[#1d1836] border border-[#ffffff15] px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <span className="text-white font-bold text-sm">400+ Solved</span>
              <span className="text-secondary text-xs hidden sm:inline">LeetCode DSA</span>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-[#915EFF] text-white text-sm font-semibold hover:bg-[#7c4de0] transition-all duration-300 hover:shadow-[0_0_25px_#915EFFaa] flex items-center gap-2"
            >
              Explore Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume PDF
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-[#915EFF] text-white text-sm font-semibold hover:bg-[#915EFF22] transition-all duration-300 flex items-center gap-2"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
