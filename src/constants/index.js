import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  Three3js,
  express,
  python,
  nextjs,
  fastapi,
  postgres,
  chromadb,
  langchain,
  grafana,
  docker,
  planarc,
  bluestock,
  unified,
  project_food,
  project_skillswap,
  skillswap_1,
  skillswap_2,
  skillswap_3,
  project_netflix,
  project_auth,
  project_unisys,
  project_amazon,
  project_finance,
  noisesense_main,
  ns_architecture,
  ns_yamnet,
  ns_mqtt,
  ns_influx,
  ns_flutter,
  ns_flutter_settings,
  ns_gemini,
  ns_live,
  ns_map,
  ns_heatmap,
  ns_grafana1,
  ns_grafana2,
  ns_sdg,
  smart_industry_main,
  si_flowchart,
  si_block,
  si_hardware,
  si_3d_alt,
  si_dashboard,
  si_dashboard_live,
  si_ws_latency,
  si_azure_latency,
  si_fault_state,
  si_sdg,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "AI & LLM Engineer",
    icon: web,
  },
  {
    title: "RAG & Vector DB Systems",
    icon: mobile,
  },
  {
    title: "Full-Stack Web Engineer",
    icon: backend,
  },
  {
    title: "IoT & Real-Time Analytics",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "FastAPI",
    icon: fastapi,
  },
  {
    name: "PostgreSQL",
    icon: postgres,
  },
  {
    name: "ChromaDB",
    icon: chromadb,
  },
  {
    name: "LangChain",
    icon: langchain,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Express JS",
    icon: express,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Grafana",
    icon: grafana,
  },
  {
    name: "Three JS",
    icon: Three3js,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Full Stack Engineer Intern",
    company_name: "Planarc",
    icon: planarc,
    iconBg: "#1a0533",
    date: "Jul 2025 – Nov 2025",
    points: [
      "Built browser-based cloud IDE features using React.js and Monaco Editor, delivering real-time collaborative development environment with WebContainers.",
      "Optimized lazy-loading strategies and initial page load performance, achieving a 2x–3x speed improvement (20%+ gain) on self-page devices.",
      "Architected 4 backend API modules and integrated AI command workflows in an Apple-compatible environment, enabling cross-item automation.",
      "Reduced average sample latency by 1.8s using level-3 LLM fallbacks, achieving 99% uptime and faster model response throughput.",
    ],
  },
  {
    title: "Backend Developer Intern",
    company_name: "Bluestock Fintech",
    icon: bluestock,
    iconBg: "#0a1628",
    date: "Feb 2025 – Mar 2025",
    points: [
      "Developed secure, efficient, and scalable RESTful server-side APIs for a fintech platform handling real financial data.",
      "Optimized PostgreSQL and MongoDB queries, reducing average database response time by 35% through indexing and query restructuring.",
      "Implemented JWT-based authentication and role-based access control (RBAC) for multi-tier user management.",
      "Collaborated with senior engineers to design backend microservices architecture following industry-standard security practices.",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    company_name: "Unified Mentor",
    icon: unified,
    iconBg: "#111827",
    date: "Oct 2024 – Dec 2024",
    points: [
      "Developed innovative full-stack web applications using React.js on the frontend and Node.js + Express.js on the backend.",
      "Integrated MongoDB and RESTful APIs to build scalable, data-driven solutions with clean separation of concerns.",
      "Collaborated with mentors and team members to implement modern development practices and code review workflows.",
      "Successfully completed the program and earned an industry-recognized Full-Stack Development certification.",
    ],
  },
];


const testimonials = [
  {
    testimonial:
      "Adarsh built our food delivery platform with exceptional attention to UX detail. The real-time order tracking feature alone exceeded our expectations.",
    name: "Kiran Mehta",
    designation: "Product Manager",
    company: "FoodFast",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KiranMehta&backgroundColor=b6e3f4",
  },
  {
    testimonial:
      "The SkillSwap platform Adarsh delivered was smooth, intuitive, and technically solid. His MERN stack expertise really showed in the final product.",
    name: "Priya Sharma",
    designation: "Co-Founder",
    company: "SkillSwap",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma&backgroundColor=c0aede",
  },
  {
    testimonial:
      "After Adarsh optimized our finance platform with Next.js, load times dropped by 60%. His code is clean, well-documented, and maintainable.",
    name: "Rahul Verma",
    designation: "CTO",
    company: "Bluestock Fintech",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RahulVerma&backgroundColor=d1d4f9",
  },
];

const projects = [
  {
    id: "noisesense",
    name: "NoiseSense — Acoustic AI & Noise Mapping",
    description:
      "Real-time acoustic ML pipeline achieving 85%+ classification accuracy across tested environments, integrating YAMNet (521 sound categories) with DSP features from GPS-tagged audio. Sub-50ms MQTT latency, 3-6s inference/sample, and automated Gemini AI forensic reports.",
    category: "AI & IoT Pipeline",
    client: "Research & Systems Project",
    date: "2025 – 2026",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "YAMNet", color: "pink-text-gradient" },
      { name: "MQTT", color: "green-text-gradient" },
      { name: "InfluxDB", color: "orange-text-gradient" },
      { name: "Docker", color: "blue-text-gradient" },
      { name: "Grafana", color: "pink-text-gradient" },
    ],
    image: noisesense_main,
    gallery: [
      { src: noisesense_main, title: "Noise Mapper Web Dashboard UI — Real-Time Live Map & Telemetry" },
      { src: ns_architecture, title: "5-Layer System Architecture & End-to-End Data Flow Block Diagram" },
      { src: ns_yamnet, title: "YAMNet ML Inference Pipeline (16kHz Mono -> Log Mel Spectrogram -> 521 Classes)" },
      { src: ns_mqtt, title: "MQTT Message Broker Architecture (Decoupled Async Pub-Sub on Port 1883)" },
      { src: ns_influx, title: "InfluxDB Time-Series Schema & Storage Layer (Tags, Fields & Nanosecond Timestamps)" },
      { src: ns_live, title: "Live dB Visualizer — Noise Class Distribution Donut Chart & Decibel Level Over Time" },
      { src: ns_map, title: "Live Noise Map with WHO Color-Coded Hazard Markers (NH332 Corridor, Puducherry)" },
      { src: ns_heatmap, title: "Geospatial Noise Heatmap — Thermal Intensity Overlay of Acoustic Concentration" },
      { src: ns_grafana1, title: "Grafana Analytics Dashboard — KPI Panels & Time-Series Acoustic Trends" },
      { src: ns_grafana2, title: "Grafana Advanced Analytics — Peak vs RMS Scatter Plot, ZCR & Spectral Centroid" },
      { src: ns_gemini, title: "Google Gemini 2.5 Flash Automated AI PDF Intelligence Report Modal Output" },
      { src: ns_flutter, title: "Flutter Mobile App — Live dB Gauge, Telemetry Status & GPS Coordinates" },
      { src: ns_flutter_settings, title: "Flutter Mobile App — Server IP Configuration & Offline Queue Settings" },
      { src: ns_sdg, title: "UN Sustainable Development Goals (SDG 3: Good Health & SDG 11: Sustainable Cities)" },
    ],
    source_code_link: "https://github.com/adarshaldkar/smart-noise-mapping-system",
    details: {
      longDescription: `NoiseSense (Smart City Acoustic Forensics & Noise Mapping System) is an end-to-end IoT, Machine Learning, and Generative AI platform for crowdsourced urban noise monitoring. Built for municipal departments and environmental compliance officers, it turns field inspectors' smartphones into distributed zero-cost noise sensors.

The system captures 5-second AAC-LC audio clips at 16 kHz mono every 15 seconds, tags exact GPS coordinates, computes 5-dimensional Digital Signal Processing (DSP) acoustic features (RMS dB, Peak Amplitude, Zero Crossing Rate, Spectral Centroid, Spectral Rolloff), and classifies sound sources across 521 categories using Google's YAMNet deep learning model (MobileNetV2 backbone trained on 2M+ AudioSet samples) with >85% classification accuracy.

Data transmission is decoupled via an Eclipse Mosquitto MQTT broker (port 1883, QoS 0) to ensure sub-50ms latency. The Flask API ingests audio streams asynchronously while an ML Consumer executes YAMNet inference and writes nanosecond-precision time-series data to InfluxDB 1.7.10.

For analytics and compliance, an interactive Leaflet.js dashboard renders live WHO-aligned color-coded hazard markers (Green: <45 dB Safe, Yellow: 45-65 dB Moderate, Orange: 66-85 dB Loud, Red: >85 dB Hazard) and thermal intensity heatmaps. Google Gemini 2.5 Flash REST API automatically parses session statistics to generate downloadable PDF intelligence reports for municipal enforcement.`,
      highlights: [
        ">85% YAMNet ML Classification Accuracy across 521 Sound Categories",
        "Sub-50ms Asynchronous MQTT Telemetry Pipeline (Port 1883, QoS 0)",
        "Google Gemini 2.5 Flash Automated PDF Forensic Intelligence Report Generation",
        "5-Dimensional DSP Feature Extraction (RMS dB, Peak Amp, ZCR, Spectral Centroid, Rolloff)",
        "100% Offline Buffer Recovery with Zero Sample Loss via SharedPreferences Queue",
        "Leaflet.js Interactive Noise Map & Thermal Intensity Heatmap Overlay",
        "Grafana Analytics Dashboard with InfluxDB Nanosecond Time-Series Queries",
        "Docker Compose Containerization across 5 Microservices",
      ],
    },
  },
  {
    id: "vibecoder",
    name: "VibeCoder — AI Cloud Browser IDE",
    description:
      "Cloud browser IDE supporting 6 stacks (React, Next.js, Express, Hono, Vue, Angular) via WebContainers (~15.4s cold boot, 5ms warm reconnect). Features Gemini 1.5 Flash AI code autocomplete (<0.8s latency, 90%+ improvement over local LLM), AI Wrench runtime error patcher, and AI README Generator.",
    category: "Cloud IDE & GenAI",
    client: "Open Source AI Project",
    date: "2025 – 2026",
    tags: [
      { name: "Next.js 15", color: "blue-text-gradient" },
      { name: "WebContainers", color: "green-text-gradient" },
      { name: "Monaco Editor", color: "pink-text-gradient" },
      { name: "Gemini 1.5 Flash", color: "orange-text-gradient" },
      { name: "Prisma", color: "blue-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
    ],
    image: project_food,
    gallery: [project_food, project_auth],
    source_code_link: "https://github.com/adarshaldkar/vibecode-playground",
    details: {
      longDescription: `VibeCoder is a production-grade browser-based collaborative cloud development environment that runs Node.js micro-environments directly inside the browser using the WebContainers API.

The platform allows developers to spin up full-stack Node.js environments (React, Next.js, Express, Hono, Vue, Angular) within seconds, featuring zero-latency local terminal execution via xterm.js and a 6-theme Monaco Editor.

A key highlight is the AI Assistant powered by Gemini 1.5 Flash with custom prompt engineering. It delivers context-aware inline code suggestions with <0.8s latency (a 90%+ speedup over local LLM fallbacks), features an AI Wrench that automatically scans terminal errors to patch code, and generates AI README documentation by parsing workspace files simultaneously.`,
      highlights: [
        "In-Browser Node.js Micro-Runtimes via WebContainers API (6 Stacks)",
        "Context-Aware Gemini 1.5 Flash AI Autocomplete (<0.8s Latency)",
        "AI Wrench Automated Terminal Runtime Error Repair",
        "Multi-File Workspace Parsing & AI README Generator",
        "Persistent Monaco Code Editor with xterm.js Terminal",
      ],
    },
  },
  {
    id: "smart-industry",
    name: "Smart Industry 4.0 — Digital Twin Predictive Maintenance",
    description:
      "Industrial IoT digital twin integrating physical factory conveyor simulation, ESP8266 sensor telemetry, Python WebSockets, and Three.js 3D GLTF interactive model. Ranked Top 24 out of 8,000+ projects in Unisys Innovation Program 2025.",
    category: "UIP-2025 Top 24 National Project",
    client: "Unisys Innovation Program",
    date: "UIP-2025",
    tags: [
      { name: "Three.js", color: "blue-text-gradient" },
      { name: "Python", color: "green-text-gradient" },
      { name: "WebSockets", color: "orange-text-gradient" },
      { name: "ESP8266", color: "pink-text-gradient" },
      { name: "Azure Digital Twins", color: "blue-text-gradient" },
    ],
    image: smart_industry_main,
    gallery: [
      { src: smart_industry_main, title: "3D Digital Twin Visualization in Three.js (Factory Conveyor, Boiler & Arm)" },
      { src: si_block, title: "System Architecture & Hardware Block Diagram (ESP8266, Sensors & Servo Actuators)" },
      { src: si_flowchart, title: "Proposed Smart Industry 5.0 Decision & Control Flowchart" },
      { src: si_hardware, title: "Physical Hardware Setup (ESP8266, Conveyor Belt, Sensors & Servo Lubricator)" },
      { src: si_3d_alt, title: "3D Digital Twin Factory Model (Alternate Perspective View)" },
      { src: si_dashboard, title: "Web Dashboard UI — Real-Time Industrial Telemetry & Status Cards" },
      { src: si_dashboard_live, title: "Live Factory Monitoring Panel — Real-Time Sensor Graphs & State" },
      { src: si_ws_latency, title: "WebSocket Full-Duplex Telemetry Latency Benchmark (<35ms Average)" },
      { src: si_azure_latency, title: "Azure Digital Twins (DTDL JSON-LD Graph) Cloud Sync Latency" },
      { src: si_fault_state, title: "3D Fault State Visualization — Red Highlight Alert on Conveyor Belt Fault" },
      { src: si_sdg, title: "UN Sustainable Development Goal 9 (Industry, Innovation & Infrastructure)" },
    ],
    source_code_link: "https://github.com/adarshaldkar",
    details: {
      longDescription: `Smart Industry 5.0 (Digital Twin Based Predictive Maintenance System) is an integrated Cyber-Physical System (CPS) engineered for the Unisys Innovation Program 2025 (UIP-2025), where our team achieved national recognition, ranking 24th out of 8,000+ participating projects.

The system combines physical hardware (ESP8266 NodeMCU microcontrollers, SW-420 vibration sensors, MQ2 gas/smoke detectors, IR product counters, LM35 temperature sensors, L298N motor drivers, and SG90 servo motor lubricant dispensers) with a 3D digital twin interface built using Three.js and WebGL.

Sensor telemetry is streamed at sub-35ms latency over full-duplex WebSockets (ws://) to an Azure Digital Twin platform (DTDL JSON-LD graph) and a custom web dashboard. An Isolation Forest machine learning anomaly detection engine (scoring s >= 0.6) combined with Z-score normalized vibration analysis computes equipment Remaining Useful Life (RUL) and automatically triggers physical servo lubricant valves to prevent mechanical bearing seizure.`,
      highlights: [
        "Unisys Innovation Program 2025 (UIP-2025) National Top 24 Finalist (Ranked #24 out of 8,000+ Teams)",
        "Real-Time Interactive Three.js 3D Factory Model Synced with Hardware Telemetry",
        "Sub-35ms Full-Duplex WebSockets (ws://) Telemetry Pipeline",
        "Azure Digital Twins Integration using Digital Twin Definition Language (DTDL JSON-LD)",
        "Isolation Forest Anomaly Detection Algorithm & Z-Score Vibration Thresholding",
        "Automated Servo-Driven Lubrication Valve Actuation & Motor PWM Emergency Stops",
        "UN Sustainable Development Goal 9 (Industry, Innovation & Infrastructure) Alignment",
      ],
    },
  },
  {
    id: "mindcare",
    name: "MindCare AI — Psychiatric RAG Assistant",
    description:
      "Multi-source AI orchestrator classifying user intent and routing queries to optimal strategy (RAG, direct LLM, MCP web search, or memory retrieval). Features 6-format document processing (PaddleOCR -> pgvector cosine search -> reranking) and faster-whisper local STT.",
    category: "GenAI & RAG Architecture",
    client: "In Development",
    date: "2026",
    tags: [
      { name: "FastAPI", color: "green-text-gradient" },
      { name: "RAG", color: "blue-text-gradient" },
      { name: "pgvector", color: "pink-text-gradient" },
      { name: "MCP Protocol", color: "orange-text-gradient" },
      { name: "PaddleOCR", color: "blue-text-gradient" },
      { name: "faster-whisper", color: "green-text-gradient" },
    ],
    image: project_auth,
    gallery: [project_auth],
    source_code_link: "https://github.com/adarshaldkar",
    details: {
      longDescription: `MindCare AI is an agentic psychiatric RAG assistant engineered to deliver grounded, hallucination-free medical document queries, clinical guidelines retrieval, and multi-turn conversational support.

The core architecture utilizes a multi-source AI orchestrator that classifies user intent and dynamically routes queries to the optimal strategy: pgvector document RAG, direct LLM generation at temperature=0.1, real-time web search via MCP (Model Context Protocol), or memory retrieval.

The document processing pipeline supports 6 document formats (PDF, DOCX, PPTX, TXT, JPG, PNG) using PaddleOCR for scanned text, sentence-transformers for vector embeddings, pgvector cosine search, and cross-encoder reranking. Voice input is handled via faster-whisper local speech-to-text, providing fully offline, zero-API-cost private audio transcription.`,
      highlights: [
        "Agentic Intent Orchestrator Routing Queries across 4 Dynamic Strategies",
        "6-Format Document Processing (PaddleOCR -> pgvector -> Reranker)",
        "Grounded Generation at Temperature=0.1 to Minimize Medical Hallucinations",
        "Fully Offline Local Speech-to-Text via faster-whisper (Zero API Cost)",
        "3-Tier Conversation Memory (Short-Term, Fact Extraction, Long-Term)",
      ],
    },
  },
  {
    id: "lvms",
    name: "LVMS — Loan Verification Management System",
    description:
      "Production-ready Loan Verification Management System built for a fintech client. Features automated document verification workflows, user status tracking, role-based admin approval boards, and secure JWT/OAuth authentication.",
    category: "Fintech Platform",
    client: "Fintech Client",
    date: "Completed 2026",
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Express.js", color: "pink-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "JWT", color: "orange-text-gradient" },
      { name: "Tailwind CSS", color: "blue-text-gradient" },
    ],
    image: project_skillswap,
    gallery: [project_skillswap, skillswap_1, skillswap_2, skillswap_3],
    source_code_link: "https://github.com/adarshaldkar/Loan_verification_system",
    details: {
      longDescription: `LVMS (Loan Verification Management System) is an end-to-end full-stack fintech platform designed to streamline loan application verification, document validation, and risk assessment for financial institutions.

The application implements strict Role-Based Access Control (RBAC) separating Applicant, Verification Inspector, and Branch Manager user roles. Applicants submit personal and financial verification documents, inspectors conduct field verification checks and record findings, and managers review approval boards.

On the technical side, the backend is built with Node.js, Express, and MongoDB, enforcing JWT authentication, input sanitization, and automated document status state machines. The React + Tailwind frontend provides responsive data tables and real-time status tracking.`,
      highlights: [
        "Complete Full-Stack Loan Verification & Document Processing System",
        "Multi-Tier Role-Based Access Control (Applicant, Field Officer, Manager)",
        "Automated Application Status State Machine & Audit Logs",
        "Secure JWT Authentication & Document Storage Pipelines",
        "Responsive Dashboard UI with Real-Time Table Filtering",
      ],
    },
  },
  {
    id: "documind",
    name: "DocuMind — Multi-Document RAG Q&A System",
    description:
      "Multi-document RAG pipeline built with LangChain, ChromaDB vector store, and OpenAI/FastAPI REST backend. Supports PDF ingestion, recursive text splitting, semantic retrieval, and grounded LLM answers with exact source page citations.",
    category: "RAG & LLM System",
    client: "Open Source AI Project",
    date: "2025",
    tags: [
      { name: "LangChain", color: "green-text-gradient" },
      { name: "ChromaDB", color: "blue-text-gradient" },
      { name: "FastAPI", color: "pink-text-gradient" },
      { name: "OpenAI API", color: "orange-text-gradient" },
      { name: "React.js", color: "blue-text-gradient" },
    ],
    image: project_finance,
    gallery: [project_finance, project_auth],
    source_code_link: "https://github.com/adarshaldkar/psychiatric_LLM_Project",
    details: {
      longDescription: `DocuMind is an intelligent multi-document Retrieval-Augmented Generation (RAG) system engineered to parse complex documents and answer user queries with verifiable citations.

The backend is constructed using LangChain and FastAPI. Incoming PDF documents undergo PyMuPDF text extraction, recursive character text splitting into 1000-character chunks with 200-character overlap, and OpenAI vector embedding generation stored inside ChromaDB.

When a query is submitted, DocuMind executes similarity search against ChromaDB, feeds retrieved context to the LLM, and formats grounded responses containing exact source citations (document name + page number). ConversationBufferMemory maintains multi-turn conversation state across turns.`,
      highlights: [
        "Grounded LLM Generation with Exact Document Name & Page Citations",
        "LangChain RAG Pipeline with ChromaDB Vector Store",
        "Recursive Text Splitting & High-Precision Semantic Vector Search",
        "Multi-Turn Context Retention via ConversationBufferMemory",
        "FastAPI REST Endpoints with React Drag-and-Drop Upload UI",
      ],
    },
  },
  {
    id: "turfspot",
    name: "TurfSpot Booking — Sports Venue Platform",
    description:
      "Full-stack sports venue booking and slot management platform built during Odoo Hackathon 2025. Ranked Finalist in Top 78 out of 19,000+ national participants. Features real-time slot selection, payment integration, and owner dashboards.",
    category: "Odoo Hackathon 2025 Finalist (Top 78)",
    client: "Odoo Hackathon 2025",
    date: "2025",
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Express.js", color: "pink-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Tailwind CSS", color: "orange-text-gradient" },
    ],
    image: project_amazon,
    gallery: [project_amazon, project_food],
    source_code_link: "https://github.com/adarshaldkar/turfspot_booking_hackathon",
    details: {
      longDescription: `TurfSpot Booking is a real-time sports venue reservation platform engineered for the Odoo Hackathon 2025, where our project was selected as a Finalist in the Top 78 out of 19,000+ national candidates.

The platform addresses double-booking issues in sports arenas by implementing a real-time slot conflict resolution algorithm. Sports players can search venues by city, view hourly availability calendars, choose specific turf slots (football, cricket, badminton), and receive instant booking receipts.

Venue owners get a dedicated management portal featuring real-time revenue analytics, slot pricing overrides, and booking management tools. The stack uses React, Node.js, Express, MongoDB, and Tailwind CSS.`,
      highlights: [
        "Selected Finalist — Top 78 out of 19,000+ Participants in Odoo Hackathon 2025",
        "Real-Time Slot Conflict Prevention & Venue Reservation Engine",
        "Turf Owner Admin Dashboard with Revenue & Pricing Control",
        "Instant Booking Confirmation & Interactive Calendar UI",
        "Full-Stack MERN Architecture with Responsive Design",
      ],
    },
  },
];

export { services, technologies, experiences, testimonials, projects };

