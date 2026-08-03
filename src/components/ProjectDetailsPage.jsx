import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../constants";
import { github } from "../assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StarsCanvas from "./canvas/Stars";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Find project by ID or fallback to first project
  const project = projects.find((p) => p.id === id) || projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return null;

  const galleryItems = project.gallery || [project.image];

  return (
    <div className="relative z-0 bg-[#050816] text-white min-h-screen flex flex-col">
      {/* Background Aurora & Stars */}
      <div className="aurora-container" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
      </div>
      <StarsCanvas />

      {/* Top Navbar */}
      <Navbar />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-16 pt-28 pb-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-secondary">
            <li>
              <Link to="/" className="hover:text-[#915EFF] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-[#915EFF] font-medium">{project.category}</span>
            </li>
            <li>/</li>
            <li className="text-white font-semibold truncate">{project.name}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10">
          <div className="inline-block bg-[#915EFF15] text-[#915EFF] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#915EFF35] mb-3">
            {project.category}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide leading-tight">
            {project.name}
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-4xl leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* TOP SECTION: Perfectly Balanced 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* LEFT COLUMN (7 cols): Main Hero Cover Image */}
          <div className="lg:col-span-7 space-y-4">
            <div
              onClick={() => setSelectedImage(typeof project.image === "string" ? project.image : project.image.src)}
              className="w-full rounded-3xl overflow-hidden border border-[#ffffff15] bg-[#151030] shadow-[0_0_40px_rgba(145,94,255,0.2)] group cursor-pointer hover:border-[#915EFFaa] transition-all duration-300 relative"
            >
              <img
                src={typeof project.image === "string" ? project.image : project.image.src}
                alt={project.name}
                className="w-full h-auto max-h-[480px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816dd] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-xs font-bold text-white bg-[#915EFF] px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                  🔍 Click to View Full Screen
                </span>
              </div>
            </div>
            <div className="text-center text-xs text-secondary font-medium">
              Primary System Dashboard & Cover Interface
            </div>
          </div>

          {/* RIGHT COLUMN (5 cols): Project Information & Tech Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#151030] p-7 rounded-3xl border border-[#915EFF33] shadow-[0_0_30px_#915EFF15] space-y-5">
              <h2 className="text-lg font-bold text-white border-b border-[#ffffff10] pb-3 flex items-center gap-2">
                📌 Project Specifications
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-[#ffffff0a]">
                  <span className="text-secondary font-medium">Category</span>
                  <span className="text-white font-semibold">{project.category}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[#ffffff0a]">
                  <span className="text-secondary font-medium">Client / Context</span>
                  <span className="text-white font-semibold">{project.client}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[#ffffff0a]">
                  <span className="text-secondary font-medium">Timeline</span>
                  <span className="text-white font-semibold">{project.date}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-2">
                <span className="text-xs text-secondary font-medium block mb-2">Technologies Used:</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`text-xs font-semibold ${tag.color} bg-[#ffffff0a] px-3 py-1 rounded-full border border-[#ffffff10]`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                {project.source_code_link && (
                  <a
                    href={project.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm text-center shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <img src={github} alt="github" className="w-4 h-4 object-contain mix-blend-color-dodge" />
                    View Source Code on GitHub 🚀
                  </a>
                )}

                <Link
                  to="/"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#ffffff10] hover:bg-[#ffffff20] text-white font-semibold text-sm text-center transition-all duration-200"
                >
                  ← Back to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED EXPLANATION SECTION */}
        <div className="bg-[#1d1836] p-8 sm:p-10 rounded-3xl border border-[#ffffff10] shadow-xl space-y-6 mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-[#915EFF] border-b border-[#ffffff10] pb-4 flex items-center gap-2">
            📖 Detailed Architecture & Technical Writeup
          </h2>

          <div className="text-secondary text-base leading-[30px] whitespace-pre-line space-y-4">
            {project.details?.longDescription || project.description}
          </div>

          {/* Highlights Checklist */}
          {project.details?.highlights && (
            <div className="mt-8 pt-6 border-t border-[#ffffff10] space-y-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                ⚡ Key Technical Accomplishments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.details.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="text-[#915EFF] font-bold mt-0.5 text-base">✓</span>
                    <span className="text-sm text-secondary leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PERFECTLY ALIGNED GALLERY GRID: 2 Columns Full Width */}
        <section className="space-y-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ffffff10] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                📸 Architecture Diagrams & System Screenshots
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                Click any diagram or screenshot to expand in high-resolution view
              </p>
            </div>
            <span className="text-xs text-[#915EFF] font-semibold bg-[#915EFF15] px-3.5 py-1.5 rounded-full border border-[#915EFF30]">
              {galleryItems.length} Visual Assets Attached
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.map((item, index) => {
              const imgSrc = typeof item === "string" ? item : item.src;
              const imgTitle = typeof item === "object" ? item.title : null;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedImage(imgSrc)}
                  className="w-full rounded-2xl overflow-hidden border border-[#ffffff15] bg-[#151030] shadow-xl group hover:border-[#915EFFaa] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden bg-[#0d0920] flex items-center justify-center p-2 min-h-[220px]">
                    <img
                      src={imgSrc}
                      alt={imgTitle || `${project.name} screenshot ${index + 1}`}
                      className="w-full h-auto max-h-[340px] object-contain group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#05081699] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-bold text-white bg-[#915EFF] px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        🔍 Click to Expand
                      </span>
                    </div>
                  </div>
                  {imgTitle && (
                    <div className="p-4 bg-[#181335] border-t border-[#ffffff10] text-xs text-secondary font-medium">
                      <span className="text-[#915EFF] font-bold mr-2 bg-[#915EFF20] px-2 py-0.5 rounded">
                        Fig {index + 1}
                      </span>
                      {imgTitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SPECIAL NOISESENSE DEEP ARCHITECTURE SECTION */}
        {project.id === "noisesense" && (
          <section className="pt-12 border-t border-[#ffffff15] space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[#915EFF] uppercase tracking-widest bg-[#915EFF15] px-4 py-1.5 rounded-full border border-[#915EFF40]">
                Deep Engineering Specifications
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Acoustic Forensics & System Architecture Breakdown
              </h2>
              <p className="text-secondary text-sm sm:text-base">
                Extracted from the B.Tech ECE Final Project Report (May 2026, MVIT Puducherry)
              </p>
            </div>

            {/* UN Sustainable Development Goals Section */}
            <div className="bg-[#1d1836] p-8 rounded-3xl border border-[#915EFF33] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block bg-[#00e67615] text-[#00e676] px-3.5 py-1 rounded-full text-xs font-bold border border-[#00e67640]">
                  UN SDGs Mapping
                </div>
                <h3 className="text-xl font-bold text-white">Sustainable Development Goals</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Noise pollution is the 2nd largest environmental health hazard globally (WHO). NoiseSense directly aligns with United Nations Sustainable Development Goals:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#151030] border border-[#ffffff10]">
                    <div className="font-bold text-white text-sm">SDG 3: Good Health & Well-Being</div>
                    <div className="text-xs text-secondary mt-1">Mitigates Noise-Induced Hearing Loss (NIHL) & cardiovascular risks by flagging dB hazard thresholds (&gt;85 dB).</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#151030] border border-[#ffffff10]">
                    <div className="font-bold text-white text-sm">SDG 11: Sustainable Cities & Communities</div>
                    <div className="text-xs text-secondary mt-1">Empowers municipal governance with real-time crowdsourced noise heatmaps and automated Gemini AI PDF reports.</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#151030] p-6 rounded-2xl border border-[#ffffff0a]">
                <div className="text-center text-xs text-secondary mb-3 font-semibold">Official UN SDG Mapping Figures</div>
                <img src={typeof project.gallery?.[13] === "object" ? project.gallery[13].src : project.image} alt="SDG Mapping" className="max-h-64 object-contain rounded-xl" />
              </div>
            </div>

            {/* 5-Dimensional DSP Extraction & YAMNet Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* DSP Features Card */}
              <div className="bg-[#1d1836] p-7 rounded-3xl border border-[#ffffff10] space-y-5">
                <h3 className="text-lg font-bold text-[#915EFF] flex items-center gap-2">
                  🎛️ 5-Dimensional DSP Feature Extraction
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Unlike conventional Sound Level Meters that only output a scalar dB reading, NoiseSense extracts 5 DSP acoustic parameters per audio sample:
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">1. RMS Decibels (RMS dB)</span>
                    <code className="text-[#915EFF] text-[11px] block my-1">RMS_dB = 20 * log10(sqrt(mean(signal^2)))</code>
                    <span className="text-secondary">Quantifies sound energy intensity relative to full-scale digital reference.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">2. Peak Amplitude</span>
                    <code className="text-[#915EFF] text-[11px] block my-1">Peak_Amp = max(abs(signal))</code>
                    <span className="text-secondary">Measures maximum instantaneous waveform peak for transient spike detection.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">3. Zero Crossing Rate (ZCR)</span>
                    <span className="text-secondary">Differentiates periodic voiced sound (low ZCR) from noisy broadband sound (high ZCR).</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">4. Spectral Centroid (SC) & 5. Spectral Rolloff (SR)</span>
                    <span className="text-secondary">Computes the frequency center of mass (Hz) and 85% energy frequency limit using librosa STFT.</span>
                  </div>
                </div>
              </div>

              {/* YAMNet Specifications Card */}
              <div className="bg-[#1d1836] p-7 rounded-3xl border border-[#ffffff10] space-y-5">
                <h3 className="text-lg font-bold text-[#915EFF] flex items-center gap-2">
                  🧠 Google YAMNet Deep Learning Specifications
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Google's pre-trained deep learning audio classifier trained on 2M+ human-labeled AudioSet clips:
                </p>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-[#ffffff0a]">
                    <span className="text-secondary">Model Architecture</span>
                    <span className="text-white font-semibold">MobileNetV2 (Depth-wise Separable CNN)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ffffff0a]">
                    <span className="text-secondary">Classification Ontology</span>
                    <span className="text-white font-semibold">521 Sound Classes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ffffff0a]">
                    <span className="text-secondary">Input Spectrogram</span>
                    <span className="text-white font-semibold">64-band Log Mel Spectrogram (STFT 25ms/10ms)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ffffff0a]">
                    <span className="text-secondary">Embedding Dimension</span>
                    <span className="text-white font-semibold">1024-dimensional feature vector</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ffffff0a]">
                    <span className="text-secondary">Tested ML Accuracy</span>
                    <span className="text-emerald-400 font-bold">&gt;85% Across 5 Environments</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ffffff0a]">
                    <span className="text-secondary">MQTT Transmission Latency</span>
                    <span className="text-purple-400 font-bold">&lt;50ms (Asynchronous QoS 0)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Analysis Table */}
            <div className="bg-[#1d1836] p-8 rounded-3xl border border-[#ffffff10] shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                📊 Real-World YAMNet Classification Accuracy Across Tested Environments
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-secondary border-collapse">
                  <thead>
                    <tr className="border-b border-[#ffffff20] text-white font-semibold text-sm">
                      <th className="py-3 px-4">Environment</th>
                      <th className="py-3 px-4">Top YAMNet Predicted Class</th>
                      <th className="py-3 px-4">Confidence Range</th>
                      <th className="py-3 px-4">AVG RMS dB Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffffff0a]">
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">Urban Traffic (NH332 Highway)</td>
                      <td className="py-3 px-4 text-[#915EFF]">Traffic noise, roadway noise</td>
                      <td className="py-3 px-4">0.72 – 0.91</td>
                      <td className="py-3 px-4 text-orange-400 font-semibold">68 – 76 dB (Loud)</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">Indoor Conversation</td>
                      <td className="py-3 px-4 text-[#915EFF]">Speech / Conversation</td>
                      <td className="py-3 px-4">0.65 – 0.88</td>
                      <td className="py-3 px-4 text-yellow-400 font-semibold">52 – 64 dB (Moderate)</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">Construction Zone</td>
                      <td className="py-3 px-4 text-[#915EFF]">Power tool / Drill / Jackhammer</td>
                      <td className="py-3 px-4">0.69 – 0.85</td>
                      <td className="py-3 px-4 text-rose-500 font-bold">78 – 88 dB (Hazard)</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">MVIT Cafeteria</td>
                      <td className="py-3 px-4 text-[#915EFF]">Chatter / Background noise</td>
                      <td className="py-3 px-4">0.61 – 0.79</td>
                      <td className="py-3 px-4 text-yellow-400 font-semibold">62 – 72 dB (Moderate-Loud)</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">Quiet Indoor (MVIT Library)</td>
                      <td className="py-3 px-4 text-[#915EFF]">Silence / White noise</td>
                      <td className="py-3 px-4">0.70 – 0.92</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">28 – 44 dB (Safe)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comparative Analysis Matrix */}
            <div className="bg-[#151030] p-8 rounded-3xl border border-[#915EFF33] shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                ⚖️ Comparative Analysis: NoiseSense vs. Existing Systems
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-secondary border-collapse">
                  <thead>
                    <tr className="border-b border-[#ffffff20] text-white font-semibold text-sm">
                      <th className="py-3 px-4">Feature / Metric</th>
                      <th className="py-3 px-4">CPCB Fixed SLMs</th>
                      <th className="py-3 px-4">Belgrade System (2021)</th>
                      <th className="py-3 px-4">Lucknow GIS (2022)</th>
                      <th className="py-3 px-4 text-[#915EFF] font-bold">NoiseSense (This Project)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffffff0a]">
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">Per-Sensor Cost</td>
                      <td className="py-3 px-4 text-rose-400">₹50,000 – ₹5,00,000</td>
                      <td className="py-3 px-4 text-emerald-400">₹0 (Smartphone)</td>
                      <td className="py-3 px-4 text-emerald-400">₹0 (Smartphone)</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">₹0 (Field Inspector Phone)</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">AI Source Classification</td>
                      <td className="py-3 px-4 text-rose-400">❌ None (Scalar dB)</td>
                      <td className="py-3 px-4 text-rose-400">❌ None (FFT spectrum only)</td>
                      <td className="py-3 px-4 text-rose-400">❌ None (Image CNN only)</td>
                      <td className="py-3 px-4 text-[#915EFF] font-bold">✅ 521-Class YAMNet AI</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">IoT Architecture</td>
                      <td className="py-3 px-4 text-rose-400">Fixed Hardware</td>
                      <td className="py-3 px-4">MongoDB + Spark</td>
                      <td className="py-3 px-4">Offline ArcGIS Batch</td>
                      <td className="py-3 px-4 text-purple-300 font-bold">✅ Asynchronous MQTT + InfluxDB</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">AI PDF Intelligence Report</td>
                      <td className="py-3 px-4 text-rose-400">❌ Manual Authoring</td>
                      <td className="py-3 px-4 text-rose-400">❌ None</td>
                      <td className="py-3 px-4 text-rose-400">❌ None</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">✅ Google Gemini 2.5 Flash Automated PDF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* SPECIAL SMART INDUSTRY 5.0 DEEP ARCHITECTURE SECTION */}
        {project.id === "smart-industry" && (
          <section className="pt-12 border-t border-[#ffffff15] space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[#915EFF] uppercase tracking-widest bg-[#915EFF15] px-4 py-1.5 rounded-full border border-[#915EFF40]">
                UIP-2025 Top 24 National Project
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Smart Industry 5.0 Digital Twin & Predictive Maintenance
              </h2>
              <p className="text-secondary text-sm sm:text-base">
                Extracted from B.Tech ECE Final Project Report (May 2026, MVIT Puducherry)
              </p>
            </div>

            {/* UN SDG Goal 9 Section */}
            <div className="bg-[#1d1836] p-8 rounded-3xl border border-[#915EFF33] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block bg-[#00e67615] text-[#00e676] px-3.5 py-1 rounded-full text-xs font-bold border border-[#00e67640]">
                  UN SDGs Alignment
                </div>
                <h3 className="text-xl font-bold text-white">SDG 9: Industry, Innovation & Infrastructure</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  The system directly advances SDG Goal 9 by building resilient cyber-physical infrastructure, preventing catastrophic industrial downtime, and democratizing digital twin monitoring for food processing, automotive, and heavy machinery plants.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#151030] p-6 rounded-2xl border border-[#ffffff0a]">
                <img src={typeof project.gallery?.[10] === "object" ? project.gallery[10].src : project.image} alt="SDG 9 Goal" className="max-h-48 object-contain rounded-xl" />
              </div>
            </div>

            {/* Hardware & Math Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sensors & Actuators Card */}
              <div className="bg-[#1d1836] p-7 rounded-3xl border border-[#ffffff10] space-y-5">
                <h3 className="text-lg font-bold text-[#915EFF] flex items-center gap-2">
                  🔌 ESP8266 Sensor Array & Hardware Actuators
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">1. SW-420 Vibration Transducer</span>
                    <span className="text-secondary">Monitors mechanical oscillation frequencies on motor bearing blocks to detect structural wear.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">2. MQ2 Electrochemical Gas Sensor</span>
                    <span className="text-secondary">Detects LPG, Smoke, Carbon Monoxide, and flammable gas leaks in real time.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">3. Automated SG90 Servo Lubricator</span>
                    <span className="text-secondary">Triggers 180° servo micro-valve to inject lubricant instantly upon detecting friction spikes.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">4. L298N Dual H-Bridge & PWM Speed Controller</span>
                    <span className="text-secondary">Adjusts conveyor motor RPM or executes emergency zero-voltage trip when critical faults arise.</span>
                  </div>
                </div>
              </div>

              {/* Mathematical Anomaly Formulations */}
              <div className="bg-[#1d1836] p-7 rounded-3xl border border-[#ffffff10] space-y-5">
                <h3 className="text-lg font-bold text-[#915EFF] flex items-center gap-2">
                  📐 Predictive Maintenance Algorithms & Formulas
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">Isolation Forest Anomaly Score</span>
                    <code className="text-[#915EFF] text-[11px] block my-1">s(x, ψ) = 2^(-E(h(x)) / c(n))</code>
                    <span className="text-secondary">Evaluates multi-sensor feature space; score s &ge; 0.6 dispatches immediate maintenance alerts.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">Z-Score Vibration Normalization</span>
                    <code className="text-[#915EFF] text-[11px] block my-1">V_norm = (V_raw - V_min) / (V_max - V_min)</code>
                    <span className="text-secondary">Normalizes raw ADC vibration readings against baseline motor operating bounds.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">Conveyor Travel Time Monitoring</span>
                    <code className="text-[#915EFF] text-[11px] block my-1">T_travel = t_exit - t_entry</code>
                    <span className="text-secondary">Detects mechanical jams if travel time exceeds threshold (T_threshold).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Latency Table */}
            <div className="bg-[#1d1836] p-8 rounded-3xl border border-[#ffffff10] shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                ⚡ Real-Time Telemetry & Digital Twin Communication Benchmarks
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-secondary border-collapse">
                  <thead>
                    <tr className="border-b border-[#ffffff20] text-white font-semibold text-sm">
                      <th className="py-3 px-4">Communication Protocol</th>
                      <th className="py-3 px-4">Average Latency</th>
                      <th className="py-3 px-4">Reliability Rate</th>
                      <th className="py-3 px-4">Primary Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffffff0a]">
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">WebSockets (<code className="text-[#915EFF]">ws://</code>)</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">&lt; 35 ms</td>
                      <td className="py-3 px-4">99.8%</td>
                      <td className="py-3 px-4">Real-Time Three.js 3D Digital Twin Motion Sync & Gauges</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">Azure Digital Twin Sync</td>
                      <td className="py-3 px-4 text-purple-400 font-semibold">&lt; 120 ms</td>
                      <td className="py-3 px-4">99.5%</td>
                      <td className="py-3 px-4">Cloud Graph Representation (DTDL JSON-LD Graph)</td>
                    </tr>
                    <tr className="hover:bg-[#ffffff05]">
                      <td className="py-3 px-4 text-white font-medium">MQTT Fallback Telemetry</td>
                      <td className="py-3 px-4 text-yellow-400 font-semibold">&lt; 65 ms</td>
                      <td className="py-3 px-4">99.7%</td>
                      <td className="py-3 px-4">Asynchronous Data Storage Pipeline</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#915EFF] text-sm font-bold bg-[#ffffff15] hover:bg-[#ffffff30] px-4 py-1.5 rounded-full transition-colors"
            >
              ✕ Close
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-[#ffffff20] shadow-2xl"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;
