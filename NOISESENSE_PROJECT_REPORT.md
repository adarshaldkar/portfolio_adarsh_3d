# NoiseSense: Smart City Acoustic Forensics & Noise Mapping System

> **Project Report Summary & Technical Specification**  
> **Academic Institution:** Department of Electronics and Communication Engineering (ECE), Manakula Vinayagar Institute of Technology, Puducherry (Affiliated to Pondicherry University)  
> **Degree:** Bachelor of Technology (B.Tech) in Electronics and Communication Engineering (2022 – 2026)  
> **Authors:** Adarsh Patel B (Reg: 22TC0152), Monishwaran G (Reg: 22TC0241), Ashwin R (Reg: 22TC0265)  
> **Project Guide:** Mr. S. Mohanraj, Assistant Professor, Department of ECE  
> **Date:** May 2026  

---

## Executive Summary

Environmental noise pollution is the second largest environmental health risk after air pollution (World Health Organization). Traditional noise monitoring in Indian cities relies on fewer than 20–30 fixed Sound Level Meters (SLMs) operated by the Central Pollution Control Board (CPCB), costing between ₹50,000 to ₹5,00,000 per unit, leaving vast urban areas unmonitored and providing scalar decibel readings without acoustic source identification.

**NoiseSense** (Smart City Acoustic Forensics & Noise Mapping System) is an end-to-end IoT, Machine Learning, and Generative AI platform for crowdsourced urban noise monitoring. By using field inspectors' smartphones as distributed zero-cost sensors, NoiseSense captures raw environmental audio, computes 5-dimensional Digital Signal Processing (DSP) acoustic features, classifies sound into **521 acoustic categories** using Google's **YAMNet** deep learning model with **>85% accuracy**, stores nanosecond-precision time-series data in **InfluxDB**, visualizes live noise heatmaps on a **Leaflet.js** and **Grafana** dashboard, and generates automated regulatory-grade PDF intelligence reports using **Google Gemini 2.5 Flash AI**.

---

## UN Sustainable Development Goals (SDGs) Alignment

![SDG Goals](noisesence_images/page_05_img_01.jpeg)  
![SDG Goal 3](noisesence_images/page_05_img_02.png) ![SDG Goal 11](noisesence_images/page_05_img_03.png)

1. **SDG Goal 3 (Good Health and Well-Being):** Mitigates noise-induced hearing loss (NIHL), sleep disturbance, chronic stress, and cardiovascular diseases by enabling data-driven compliance monitoring against WHO 85 dB hazard thresholds.
2. **SDG Goal 11 (Sustainable Cities and Communities):** Supports India's Smart City Mission objectives by empowering municipal authorities with real-time, city-wide noise hotspot detection and automated compliance enforcement tools.

---

## Key System Highlights & Accomplishments

- **521-Class Deep Learning Classification:** Uses YAMNet (MobileNetV2 backbone trained on 2M+ AudioSet samples) for fine-grained acoustic event identification (traffic, construction, speech, music, horns, power tools).
- **Multi-Dimensional DSP Extraction:** Extracts RMS Decibels, Peak Amplitude, Zero Crossing Rate (ZCR), Spectral Centroid, and Spectral Rolloff.
- **Asynchronous Decoupled IoT Architecture:** Flutter mobile app → Flask REST API → Eclipse Mosquitto MQTT Broker → Python ML Consumer → InfluxDB time-series database.
- **Zero Sample Loss:** Resilient offline queue in SharedPreferences with automatic sync upon network recovery (100% data recovery verified).
- **Sub-50ms MQTT Latency & 3-6s Processing Latency:** Non-blocking API returns instant HTTP 200 while ML Consumer processes inference asynchronously.
- **Automated AI Intelligence Reporting:** Google Gemini 2.5 Flash REST API generates downloadable WHO-compliant A4 PDF forensic reports via `html2pdf.js`.
- **Docker Compose Containerization:** 5 containerized microservices deployed via a single `docker-compose up -d` command.

---

## Complete 5-Layer System Architecture

![5-Layer System Architecture](noisesence_images/page_50_img_01.jpeg)
*Figure 3.2: System Architecture and Data Flow Block Diagram across 5 Layers*

```
[ Mobile Sensing Layer ]
  Smartphone Microphone + GPS → Flutter App (5s AAC @ 16kHz mono)
       │ (HTTP Multipart POST + Offline Queue)
       ▼
[ Communication Layer ]
  Flask Ingestion API → Eclipse Mosquitto MQTT Broker (port 1883, QoS 0)
       │ (Asynchronous Pub-Sub)
       ▼
[ Processing Layer ]
  Python ML Consumer → FFmpeg (MP4 to WAV) → Librosa DSP Features → YAMNet TensorFlow (521 classes)
       │
       ▼
[ Storage Layer ]
  InfluxDB 1.7.10 Time-Series DB (Tags: session_uuid, noise_class | Fields: rms_db, centroid, etc.)
       │
       ▼
[ Visualization & AI Intelligence Layer ]
  Leaflet.js Web Map + Grafana Analytics + Gemini 2.5 Flash PDF Intelligence Reports
```

---

## System Component Breakdown

### 1. Mobile Sensing Layer (Flutter Application)

![Flutter App Flowchart](noisesence_images/page_48_img_01.jpeg)  
*Figure 3.1: Flowchart of Proposed Smart City Acoustic Forensics System*

![Flutter Home Screen](noisesence_images/page_57_img_01.jpeg) ![Flutter Settings Screen](noisesence_images/page_57_img_02.jpeg)  
*Figure 3.6b & 3.6c: Flutter Mobile App Home Screen (Live dB Gauge & GPS Status) and Settings Screen*

- **Sampling Loop:** Initiates a continuous 15-second cycle upon pressing `START MAPPING`:
  - **Offline Queue Sync:** Checks SharedPreferences for unsent JSON payloads and retries upload.
  - **GPS Fix:** Captures precise latitude, longitude, and altitude using `Geolocator` package (`LocationAccuracy.high`).
  - **Audio Recording:** Captures a 5-second AAC-LC audio clip at 16 kHz mono using `record` package.
  - **Live Gauge:** Subscribes to 50ms amplitude changes (`onAmplitudeChanged`) to update the circular RMS dB UI gauge dynamically at 20 fps.
  - **Data Transmission:** Sends audio bytes and metadata via HTTP Multipart POST to `/collect`.

---

### 2. Ingestion & MQTT Broker Layer

![MQTT Message Broker Architecture](noisesence_images/page_53_img_01.jpeg)  
*Figure 3.4: MQTT Message Broker Architecture*

- **Flask Receiver:** Receives multipart request at `/collect`, stores MP4 file in `static/audio/`, and publishes two MQTT messages:
  1. GPS metadata JSON to topic `"pos"`.
  2. Raw MP4 audio bytes to topic named after ISO 8601 timestamp string.
- **Eclipse Mosquitto MQTT Broker:** Operates on port 1883 inside a Docker container using QoS 0 for minimal broker overhead and sub-50ms transmission latency.
- **Asynchronous Decoupling:** Allows Flask API to return `HTTP 200` immediately, decoupling ingestion from ML inference (which takes 3–6s per sample).

---

### 3. Python ML Consumer & YAMNet Deep Learning Pipeline

![YAMNet ML Inference Pipeline](noisesence_images/page_51_img_01.jpeg)  
*Figure 3.3: YAMNet ML Inference Pipeline Block Diagram*

- **Audio Preprocessing:**
  - Converts MP4 to 16 kHz mono WAV using FFmpeg subprocess:  
    `ffmpeg -i input.mp4 -ar 16000 -ac 1 output.wav`
  - Loads WAV into NumPy `float32` array using `librosa.load()`.
  - Computes Short-Time Fourier Transform (STFT) with 25ms frame size and 10ms hop size to produce a **64-band Log Mel Spectrogram**.
- **YAMNet Model Architecture:**
  - Pre-trained TensorFlow SavedModel loaded once at service startup.
  - Uses MobileNetV2 depth-wise separable convolutions (reducing compute costs 8–9x over standard CNNs).
  - Evaluates 0.48-second overlapping frames across the 5-second sample, producing an $(N_{\text{frames}}, 521)$ probability matrix.
  - Computes mean probability across frames to output the top predicted acoustic class and confidence score.
- **5-Dimensional DSP Feature Formulas:**
  1. **RMS Decibels:** $\text{RMS\_dB} = 20 \cdot \log_{10}\left(\sqrt{\frac{1}{N}\sum x[n]^2}\right)$
  2. **Peak Amplitude:** $\text{Peak\_Amp} = \max(|x[n]|)$
  3. **Zero Crossing Rate (ZCR):** Number of sign changes per frame via `librosa.feature.zero_crossing_rate()`.
  4. **Spectral Centroid (SC):** Frequency center of mass via `librosa.feature.spectral_centroid()`.
  5. **Spectral Rolloff (SR):** Frequency below which 85% of total spectral energy lies via `librosa.feature.spectral_rolloff()`.

---

### 4. Database & Storage Layer (InfluxDB 1.7.10)

![InfluxDB Schema and Storage Layer](noisesence_images/page_54_img_01.jpeg)  
*Figure 3.5: InfluxDB Schema and Storage Layer*

- **Database:** `noise_data` | **Measurement:** `acoustic_samples`
- **Tags (Indexed Metadata):** `session_uuid`, `user_uuid`, `noise_class`, `source`, `type`.
- **Fields (Numeric Measurement Values):** `lat`, `lon`, `alt`, `rms_db`, `peak_amplitude`, `zcr`, `spectral_centroid`, `spectral_rolloff`, `confidence`, `user_name`, `audio_filename`.
- **Timestamp:** Nanosecond-precision Unix epoch timestamp.

---

### 5. Web Dashboard & Grafana Analytics Layer

![Web Dashboard Noise Mapper](noisesence_images/page_55_img_01.jpeg)  
*Figure 3.6a: Web Dashboard UI — Noise Mapper Interface*

![Noise Heatmap View](noisesence_images/page_68_img_01.jpeg)  
*Figure 4.3b: Noise Heatmap View — Thermal Gradient Overlay*

![Grafana KPI Analytics](noisesence_images/page_70_img_01.jpeg)  
*Figure 4.4(a): Grafana Analytics Dashboard — KPI Panels and Sound Level Over Time*

![Grafana Advanced Acoustic Analytics](noisesence_images/page_71_img_01.jpeg)  
*Figure 4.4(b): Grafana Analytics Dashboard — Advanced Acoustic Analytics Panels*

- **Leaflet.js Web Dashboard (`/dashboard` & `/noisemap`):**
  - Interactive map with WHO-aligned 4-tier color-coded hazard markers:
    - 🟢 **Safe:** `< 45 dB` (Green)
    - 🟡 **Moderate:** `45 – 65 dB` (Yellow)
    - 🟠 **Loud:** `66 – 85 dB` (Orange)
    - 🔴 **Hazard:** `> 85 dB` (Red)
  - Interactive popups with full sample telemetry (class name, confidence %, dB level, peak amplitude, ZCR, spectral centroid, roll-off).
  - Thermal intensity overlay (`/heatmap`) showing blue-to-red noise concentration clusters.
- **Grafana Advanced Analytics:**
  - Real-time KPI panels (Current RMS dB, Peak Amplitude, Total Samples, Latest AI Confidence).
  - Time-series scatter plots and line charts tracking acoustic trends across monitoring sessions.
  - Pie charts displaying YAMNet sound class distributions (100% classification coverage verified).

---

### 6. AI Intelligence Report Generation (Google Gemini 2.5 Flash)

![AI Generated PDF Report Output](noisesence_images/page_58_img_01.jpeg)  
![AI Generated PDF Sample](noisesence_images/page_72_img_01.jpeg)  
*Figure 3.7 & 4.5: AI Generated PDF Report Sample — Gemini 2.5 Flash Output*

- **Endpoint:** `/api/generate-report`
- **Workflow:** Queries InfluxDB for aggregated session metrics (avg dB, peak dB, top sound classes, sample count, time window), constructs a structured Markdown prompt, calls Google Gemini 2.5 Flash REST API, renders an interactive report modal, and exports a printable A4 PDF via `html2pdf.js` in 3–8 seconds.

---

## Technical Specifications & Requirements

### Hardware Requirements

| Component | Minimum Specification | Recommended Specification |
|---|---|---|
| **Server CPU** | Intel Core i5 / AMD Ryzen 5 (Quad-Core) | Intel Core i7 / AMD Ryzen 7 |
| **Server RAM** | 8 GB | 16 GB (for multi-container Docker Compose) |
| **Server Disk** | 50 GB SSD | 100 GB NVMe SSD |
| **Mobile Sensor** | Android 10+ Smartphone | Android 12+ Smartphone with built-in mic & GPS |
| **Network** | Wi-Fi / 4G Mobile Hotspot | Wi-Fi / 5G High-Speed Cellular |

### Software Stack & Version Table

| Layer / Tool | Technology / Version | Description |
|---|---|---|
| **Mobile Framework** | Flutter 3.x (Dart 3.x) | Cross-platform mobile client |
| **Backend Framework** | Python 3.8 / Flask 2.x | Ingestion HTTP REST API |
| **IoT Broker** | Eclipse Mosquitto 2.x | MQTT Message Broker (Port 1883) |
| **Audio Processing** | FFmpeg 6.x & Librosa | MP4 to WAV 16kHz mono conversion & DSP features |
| **AI Model** | Google YAMNet (TensorFlow 2.x) | 521-class deep learning audio classifier |
| **Time-Series DB** | InfluxDB 1.7.10 | High-throughput sensor data storage |
| **Web Mapping** | Leaflet.js & OpenStreetMap | Interactive noise maps & thermal heatmaps |
| **Analytics** | Grafana 9.x | Advanced time-series dashboard |
| **LLM Intelligence** | Google Gemini 2.5 Flash | REST API for automated PDF forensic reports |
| **Orchestration** | Docker & Docker Compose 24.x | 5-service container deployment |

---

## Real-World Performance & Field Testing Results

Field testing was conducted across Puducherry urban streets (NH332 National Highway corridor), MVIT campus (library, cafeteria, classrooms), and active construction sites.

### 1. YAMNet Classification Accuracy Across Environments

| Environment | Dominant YAMNet Class | Confidence Range | Average RMS dB |
|---|---|---|---|
| **Urban Traffic (NH332)** | Traffic noise, roadway noise | 0.72 – 0.91 | 68 – 76 dB |
| **Indoor Conversation** | Speech / Conversation | 0.65 – 0.88 | 52 – 64 dB |
| **Construction Zone** | Power tool / Drill / Jackhammer | 0.69 – 0.85 | 78 – 88 dB |
| **Cafeteria** | Chatter / Background noise | 0.61 – 0.79 | 62 – 72 dB |
| **Quiet Indoor (Library)** | Silence / White noise | 0.70 – 0.92 | 28 – 44 dB |

- **Overall YAMNet Accuracy:** **> 85%** across all test environments.

### 2. Network & MQTT Pipeline Performance

| Network Condition | Upload Success Rate | Avg Upload Time | MQTT Latency |
|---|---|---|---|
| **University Wi-Fi (Strong)** | 95% – 98% | < 2 seconds | < 50 ms |
| **Mobile Data (Good 4G)** | 88% – 93% | 2 – 5 seconds | < 100 ms |
| **Mobile Data (Weak 3G)** | 70% – 85% | 5 – 12 seconds | < 250 ms |
| **No Connectivity** | 0% (Queued Offline) | N/A (Auto-synced on reconnect) | N/A |

- **Offline Recovery:** **100% data recovery** (0% sample loss) verified during complete network loss test (8 consecutive samples queued and transmitted upon reconnect).
- **ML Inference Throughput:** End-to-end ML pipeline completed in **3–6 seconds** per sample, operating well within the 15-second sampling cycle.

---

## Literature Survey & Comparative Matrix

![Literature Survey Methodologies](noisesence_images/page_29_img_01.png)  
*Figure 2.1: Crowdsourced Mobile Noise Monitoring Architecture*

![LoRaWAN Sensor System](noisesence_images/page_33_img_01.jpeg)  
*Figure 2.3: LoRaWAN-based IoT Noise Monitoring System (Krtalic et al., 2021)*

![Belgrade Crowdsensing App](noisesence_images/page_36_img_01.jpeg)  
*Figure 2.5: Belgrade Crowdsensing Mobile Application (Jezdovic et al., 2021)*

![Belgrade Dashboard](noisesence_images/page_36_img_02.jpeg)  
*Figure 2.6: Belgrade Noise Mapper Web Application Dashboard*

![Lucknow GIS Noise Map](noisesence_images/page_40_img_01.jpeg)  
*Figure 2.8: GIS-Based Noise Level Map — Lucknow (Dubey et al., 2022)*

![Alexandria Study Map](noisesence_images/page_42_img_01.jpeg)  
*Figure 2.10: Alexandria Downtown Case Study Area — Spatial Analysis Map (Othman et al., 2024)*

### Comparative Matrix: NoiseSense vs. Existing Systems

| Feature / Metric | Fixed SLM Networks (CPCB) | Crowdsourced Apps (NoiseTube / NoiseSPY) | Belgrade Crowdsensing (Jezdovic 2021) | Lucknow GIS System (Dubey 2022) | **NoiseSense (Proposed System)** |
|---|---|---|---|---|---|
| **Per-Sensor Capital Cost** | ₹50,000 – ₹5,00,000 | ₹0 (Smartphone) | ₹0 (Smartphone) | ₹0 (Smartphone) | **₹0 (Field Inspector Smartphone)** |
| **Spatial Coverage** | Extremely Sparse (<30/city) | High | Medium (5 microlocations) | Medium (Intersection focus) | **High (City-Wide Crowdsourced)** |
| **Acoustic Source Classification** | ❌ None (Scalar dB only) | ❌ None (Manual tag only) | ❌ None (FFT spectrum only) | ❌ None (CNN image only) | **✅ 521-Class AI (YAMNet)** |
| **DSP Feature Extraction** | ❌ Scalar dB | ❌ RMS dB only | ⚠️ FFT spectrum | ❌ Offline SPL | **✅ 5 Features (RMS, Peak, ZCR, SC, SR)** |
| **IoT Data Pipeline** | ❌ Fixed polling | ❌ HTTP REST only | ❌ Monolithic REST | ❌ Batch processing | **✅ Asynchronous MQTT + InfluxDB** |
| **AI Intelligence Report** | ❌ Manual report | ❌ None | ❌ None | ❌ Static GIS maps | **✅ Google Gemini 2.5 Flash Automated PDF** |
| **Deployment Stack** | Hardware Stations | Custom App | MongoDB + Spark | ArcGIS Offline | **✅ Docker Compose (5 Microservices)** |

---

## Conclusion & Future Directions

### Conclusion

The **Smart City Acoustic Forensics & Noise Mapping System (NoiseSense)** demonstrates a production-grade integration of IoT crowdsourcing, deep learning acoustic classification, time-series data analytics, and generative AI. Real-world field testing in Puducherry confirmed:
- YAMNet classification accuracy exceeding **85%**.
- Real-time telemetry streaming with **<50ms MQTT latency**.
- 100% offline data recovery during network drops.
- Automated regulatory report generation via Google Gemini 2.5 Flash in **3–8 seconds**.

### Future Scope

1. **Smartphone Calibration Correction:** Device-specific microphone calibration offsets for Realme, Xiaomi, Samsung, and OnePlus models.
2. **India-Specific YAMNet Fine-Tuning:** Fine-tuning on a specialized dataset covering pressure horns, autorickshaws, temple bells, and festival firecrackers.
3. **Spatial Kriging Interpolation:** Generating continuous noise contour maps between discrete smartphone measurement nodes.
4. **Predictive Noise Forecasting:** Training LSTM recurrent neural networks on InfluxDB time-series history to forecast future peak noise times.
5. **CPCB GeoJSON API Export:** Native integration with CPCB digital infrastructure platforms for automated environmental regulatory filings.

---

*Report extracted and documented from `ECE_FINAL_REPORT_DONE  (1).pdf`.*
