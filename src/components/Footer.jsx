import React from "react";
import { FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full pt-8 pb-16 sm:pb-28 bg-black-100 text-white border-t border-[#ffffff0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:pl-44 md:pr-52 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-[#915EFF] font-bold text-lg tracking-wide">Adarsh Patel</span>
          <span className="text-secondary text-xs">Full-Stack Developer · MERN · Next.js · DSA</span>
        </div>

        <p className="text-secondary text-xs text-center">
          © {new Date().getFullYear()} B. Adarsh Patel. Crafted with ❤️ & Three.js
        </p>

        <div className="flex gap-5 items-center">
          {[
            { href: "https://github.com/adarshaldkar", icon: <FaGithub size={20} />, label: "GitHub" },
            { href: "https://www.linkedin.com/in/adarsh-patel14", icon: <FaLinkedin size={20} />, label: "LinkedIn" },
            { href: "https://x.com/", icon: <FaXTwitter size={20} />, label: "Twitter" },
            { href: "https://www.instagram.com/adarsh_haldkar_/", icon: <FaInstagram size={20} />, label: "Instagram" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-secondary hover:text-[#915EFF] hover:drop-shadow-[0_0_8px_#915EFF] transition-all duration-300"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
