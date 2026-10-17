import React from "react";
import { Tilt } from 'react-tilt';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  id,
  name,
  description,
  tags,
  image,
  source_code_link,
  category,
}) => {
  const handleOpenDetails = () => {
    window.open(`/project/${id || "noisesense"}`, "_blank");
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.5)}
      className="w-full"
    >
      <Tilt
        options={{ max: 12, scale: 1.03, speed: 400 }}
        className="w-full bg-tertiary rounded-3xl overflow-hidden cursor-pointer group border border-[#ffffff08] hover:border-[#915EFF44] transition-all duration-300 hover:shadow-[0_0_40px_#915EFF22] tilt-card-holo"
        onClick={handleOpenDetails}
      >
        {/* Image */}
        <div className="relative w-full h-[260px] overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1836] via-transparent to-transparent opacity-80" />

          {/* GitHub icon */}
          <div className="absolute top-4 right-4 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="black-gradient w-11 h-11 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg border-none"
              title={`View ${name} Source Code on GitHub`}
              aria-label={`View ${name} Source Code on GitHub`}
            >
              <img src={github} alt="github" className="w-5 h-5 object-contain mix-blend-color-dodge" />
            </button>
          </div>

          {/* Category tag in top-left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[11px] font-semibold text-white bg-[#915EFF] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {category || tags[0]?.name || "Featured Project"}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-7">
          <h3 className="text-white font-bold text-[22px] leading-snug group-hover:text-[#915EFF] transition-colors duration-200">
            {name}
          </h3>
          <p className="mt-3 text-secondary text-[14px] leading-[26px] line-clamp-3">
            {description}
          </p>

          {/* Interactive CTA Button - Opens in New Tab */}
          <div className="mt-5 border-t border-[#ffffff0a] pt-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetails();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#915EFF15] hover:bg-[#915EFF] text-[#915EFF] hover:text-white border border-[#915EFF44] hover:border-[#915EFF] text-[13px] font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:bg-[#915EFF] group-hover:text-white"
            >
              View Details & Architecture →
            </button>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[12px] font-medium ${tag.color} bg-[#ffffff08] px-3 py-1 rounded-full`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My Work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Not tutorial clones — real systems built to solve real problems with measurable outcomes and technical depth.
          Click any project card to open its detailed breakdown, architecture diagrams, and gallery in a new tab.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
