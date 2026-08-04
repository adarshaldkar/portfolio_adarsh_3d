import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";
import { menu, close } from "../assets";



const Navbar = ({ onOpenCommandPalette }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-3.5 fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050816]/90 backdrop-blur-md shadow-lg shadow-[#915EFF10]" : "bg-[#050816]/60 backdrop-blur-sm"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="w-12 h-14 object-cover" />
            <p className="text-white text-[17px] font-bold cursor-pointer flex items-center">
              Adarsh &nbsp;
              <span className="sm:block hidden">| Patel</span>
            </p>
          </Link>

          {/* 🟢 Live Status Pulse Badge */}
          <div className="hidden md:flex items-center gap-2 bg-[#1d1836]/90 border border-[#ffffff15] px-3 py-1 rounded-full shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[12px] font-medium text-gray-200">
              Open to Relocate <span className="text-secondary text-[11px]">· Puducherry, IN 🇮🇳</span>
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <ul className="list-none flex flex-row gap-7">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[15px] font-medium cursor-pointer transition-colors`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          {/* Ctrl+K Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="px-3 py-1.5 rounded-xl bg-[#ffffff0a] border border-[#ffffff18] text-gray-300 hover:text-white hover:bg-[#ffffff15] text-xs font-medium transition-all duration-200 flex items-center gap-2 shadow-inner"
            title="Open Command Palette (Ctrl+K)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#915EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
            <kbd className="bg-[#1d1836] border border-[#ffffff20] px-1.5 py-0.5 rounded text-[10px] text-[#915EFF] font-mono">⌘K</kbd>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full border border-[#915EFF] text-white text-[13px] font-semibold hover:bg-[#915EFF] transition-all duration-300 shadow-[0_0_15px_#915EFF44] flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li
                className="font-poppins font-medium cursor-pointer text-[16px] text-[#915EFF]"
                onClick={() => setToggle(!toggle)}
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">📄 Resume PDF</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
