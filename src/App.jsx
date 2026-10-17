import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ThemeSwitcher from "./components/ThemeSwitcher";
import CustomCursor from "./components/CustomCursor";
import ReadingProgressBar from "./components/ReadingProgressBar";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy-load below-the-fold sections
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const CodingActivity = lazy(() => import("./components/CodingActivity"));
const Works = lazy(() => import("./components/Works"));
const DevlogSection = lazy(() => import("./components/DevlogSection"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Lazy-load 3D Stars background
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

// Lazy-load interactive modals & overlays
const ProjectDetailsPage = lazy(() => import("./components/ProjectDetailsPage"));
const AIChatbot = lazy(() => import("./components/AIChatbot"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const VisitorCounter = lazy(() => import("./components/VisitorCounter"));
const AmbientSound = lazy(() => import("./components/AmbientSound"));
const HireMeBar = lazy(() => import("./components/HireMeBar"));

// Lightweight skeleton loader for lazy sections
const SectionSkeleton = () => (
  <div className="w-full min-h-[160px] flex items-center justify-center opacity-30 py-10">
    <div className="w-8 h-8 rounded-full border-2 border-[#915EFF] border-t-transparent animate-spin" />
  </div>
);

const MainPortfolio = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      {/* ── Visitor Counter Toast ── */}
      <Suspense fallback={null}>
        <VisitorCounter />
      </Suspense>

      {/* ── Raycast Command Palette ── */}
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
      </Suspense>

      {/* ── Aurora Theme Switcher Pill ── */}
      <ThemeSwitcher />

      {/* ── Ambient Lo-Fi Sound Toggle ── */}
      <Suspense fallback={null}>
        <AmbientSound />
      </Suspense>

      {/* ── Layer 1: Aurora Glow (fixed, z-0) ── */}
      <div className="aurora-container" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>

      {/* ── Layer 2: Stars Particle Canvas (fixed, z-1) ── */}
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>

      {/* ── Layer 3: Main Content (z-10, above stars & aurora) ── */}
      <div className="relative z-10 bg-transparent">
        {/* Above the fold: paints instantly without waiting for downstream chunks */}
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
          <Hero />
        </div>

        {/* Below the fold: dynamically streamed as chunks arrive */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Tech />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CodingActivity />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Works />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <DevlogSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Feedbacks />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Footer />
        </Suspense>
      </div>

      {/* Hire Me sticky CTA — slides up after 30s */}
      <Suspense fallback={null}>
        <HireMeBar />
      </Suspense>
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
        <Suspense fallback={null}>
          <AIChatbot />
        </Suspense>

        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route
            path="/project/:id"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-screen bg-[#050816] flex items-center justify-center text-white">
                    <span className="animate-spin w-8 h-8 border-2 border-[#915EFF] border-t-transparent rounded-full" />
                  </div>
                }
              >
                <ProjectDetailsPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
