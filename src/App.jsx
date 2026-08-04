import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, CodingActivity, Works, StarsCanvas } from "./components";
import Footer from "./components/Footer";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import AIChatbot from "./components/AIChatbot";

const MainPortfolio = () => (
  <>
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
    <div className='relative z-10 bg-transparent'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <CodingActivity />
      <Works />
      <Feedbacks />
      <Contact />
      <Footer />
    </div>
    {/* Ask Adarsh AI — Floating Portfolio Assistant */}
    <AIChatbot />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
