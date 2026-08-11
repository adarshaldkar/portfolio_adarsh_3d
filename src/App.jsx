import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, CodingActivity, Works, StarsCanvas } from "./components";
import Footer from "./components/Footer";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import AIChatbot from "./components/AIChatbot";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ReadingProgressBar from "./components/ReadingProgressBar";
import VisitorCounter from "./components/VisitorCounter";
import AmbientSound from "./components/AmbientSound";
import HireMeBar from "./components/HireMeBar";
import DevlogSection from "./components/DevlogSection";
import { ThemeProvider } from "./context/ThemeContext";

const MainPortfolio = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      {/* ── Visitor Counter Toast ── */}
      <VisitorCounter />

      {/* ── Raycast Command Palette ── */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* ── Aurora Theme Switcher Pill ── */}
      <ThemeSwitcher />

      {/* ── Ambient Lo-Fi Sound Toggle ── */}
      <AmbientSound />

      {/* ── Layer 1: Aurora Glow (fixed, z-0) ── */}
      <div className="aurora-container" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>

      {/* ── Layer 2: Stars Particle Canvas (fixed, z-1) ── */}
      <StarsCanvas />

      {/* ── Layer 3: Main Content (z-10, above stars & aurora) ── */}
      <div className="relative z-10 bg-transparent">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <CodingActivity />
        <Works />
        <DevlogSection />
        <Feedbacks />
        <Contact />
        <Footer />
      </div>

      {/* Hire Me sticky CTA — slides up after 30s */}
      <HireMeBar />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* ── Global Custom Glow Cursor (Active on ALL routes) ── */}
        <CustomCursor />

        {/* ── Global Reading Progress Bar ── */}
        <ReadingProgressBar />

        {/* ── Global AI Assistant Chatbot ── */}
        <AIChatbot />

        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
