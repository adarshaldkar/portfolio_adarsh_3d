import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../constants";
import { github, live } from "../assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StarsCanvas from "./canvas/Stars";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  
  // Find project by ID or fallback to first project
  const project = projects.find((p) => p.id === id) || projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return null;

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

        {/* Page Title & Subtitle */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide leading-tight">
            {project.name}
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-4xl leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* 2-Column Grid: Left (Gallery Stack) & Right (Detailed Breakdown) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN (7 cols): Vertical Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              📸 Project Screenshots & Architecture Diagrams
            </h2>

            {(project.gallery || [project.image]).map((item, index) => {
              const imgSrc = typeof item === "string" ? item : item.src;
              const imgTitle = typeof item === "object" ? item.title : null;

              return (
                <div
                  key={index}
                  className="w-full rounded-2xl overflow-hidden border border-[#ffffff15] bg-[#151030] shadow-[0_0_30px_rgba(145,94,255,0.15)] group hover:border-[#915EFF66] transition-all duration-300"
                >
                  <img
                    src={imgSrc}
                    alt={imgTitle || `${project.name} screenshot ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {imgTitle && (
                    <div className="p-3.5 bg-[#100d25] border-t border-[#ffffff10] text-xs text-secondary font-medium">
                      <span className="text-[#915EFF] font-semibold mr-1.5">Fig {index + 1}:</span>
                      {imgTitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN (5 cols): Detailed Writeup & Info Card */}
          <div className="lg:col-span-5 space-y-8">
            {/* Detailed Writeup */}
            <div className="bg-[#1d1836] p-7 rounded-3xl border border-[#ffffff10] shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-[#915EFF] border-b border-[#ffffff10] pb-3">
                Detailed Explanation
              </h2>

              <div className="text-secondary text-[15px] leading-[28px] whitespace-pre-line space-y-4">
                {project.details?.longDescription || project.description}
              </div>

              {/* Highlights */}
              {project.details?.highlights && (
                <div className="mt-6 pt-4 border-t border-[#ffffff10] space-y-3">
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    ⚡ Key Technical Accomplishments
                  </h3>
                  <ul className="space-y-2.5">
                    {project.details.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-secondary">
                        <span className="text-[#915EFF] font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Project Information Box */}
            <div className="bg-[#151030] p-7 rounded-3xl border border-[#915EFF33] shadow-[0_0_30px_#915EFF15] space-y-5">
              <h3 className="text-lg font-bold text-white border-b border-[#ffffff10] pb-3">
                Project Information
              </h3>

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

              {/* Tags */}
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

        {/* SPECIAL NOISESENSE DEEP ARCHITECTURE SECTION */}
        {project.id === "noisesense" && (
          <section className="mt-16 pt-12 border-t border-[#ffffff15] space-y-12">
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
            <div className="bg-[#1d1836] p-8 rounded-3xl border border-[#915EFF33] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <img src={project.gallery?.[13]?.src || project.image} alt="SDG Mapping" className="max-h-64 object-contain rounded-xl" />
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
                  <div className="p-3 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">1. RMS Decibels (RMS dB)</span>
                    <code className="text-[#915EFF] text-[11px] block my-1">RMS_dB = 20 * log10(sqrt(mean(signal^2)))</code>
                    <span className="text-secondary">Quantifies sound energy intensity relative to full-scale digital reference.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">2. Peak Amplitude</span>
                    <code className="text-[#915EFF] text-[11px] block my-1">Peak_Amp = max(abs(signal))</code>
                    <span className="text-secondary">Measures maximum instantaneous waveform peak for transient spike detection.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#151030] border border-[#ffffff0a]">
                    <span className="font-bold text-white block">3. Zero Crossing Rate (ZCR)</span>
                    <span className="text-secondary">Differentiates periodic voiced sound (low ZCR) from noisy broadband sound (high ZCR).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#151030] border border-[#ffffff0a]">
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
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;
