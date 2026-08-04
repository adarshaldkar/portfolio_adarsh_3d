import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import confetti from "canvas-confetti";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";


const Hero = () => {
  const fireConfetti = () => {
    const end = Date.now() + 1500;
    const colors = ["#915EFF", "#00cea8", "#bf61ff", "#06b6d4", "#ffffff"];
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section className={`relative w-full h-screen min-h-[700px] mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[90px] sm:top-[105px] lg:top-[115px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5 pointer-events-auto'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="z-10 relative pointer-events-auto max-w-2xl">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className='text-[#915EFF]'>Adarsh</span>
          </h1>

          <div className="mt-1 text-[#915EFF] font-semibold text-base sm:text-lg tracking-wide">
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

          <p className="mt-2 text-white-100 text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] font-medium max-w-xl">
            I build AI systems and full stack products that work in production — from a browser IDE with sub-second AI autocomplete to distributed acoustic ML pipelines classifying 521 sound categories in real time.
          </p>

          {/* 3 Compact Stat Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="bg-[#1d1836]/80 backdrop-blur-sm border border-[#ffffff15] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              <span className="text-white font-bold text-xs">Top 78 / 19,000+</span>
              <span className="text-secondary text-[11px] hidden sm:inline">Odoo Hackathon</span>
            </div>

            <div className="bg-[#1d1836]/80 backdrop-blur-sm border border-[#ffffff15] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              <span className="text-white font-bold text-xs">Top 24 / 8,000+</span>
              <span className="text-secondary text-[11px] hidden sm:inline">Unisys Innovation</span>
            </div>

            <div className="bg-[#1d1836]/80 backdrop-blur-sm border border-[#ffffff15] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              <span className="text-white font-bold text-xs">400+ Solved</span>
              <span className="text-secondary text-[11px] hidden sm:inline">LeetCode DSA</span>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-full bg-[#915EFF] text-white text-xs sm:text-sm font-semibold hover:bg-[#7c4de0] transition-all duration-300 hover:shadow-[0_0_20px_#915EFF88] flex items-center gap-1.5"
            >
              Explore Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume PDF
            </a>

            <a
              href="#contact"
              onClick={fireConfetti}
              className="px-5 py-2.5 rounded-full border border-[#915EFF] text-white text-xs sm:text-sm font-semibold hover:bg-[#915EFF22] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              🎉 Get In Touch
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
