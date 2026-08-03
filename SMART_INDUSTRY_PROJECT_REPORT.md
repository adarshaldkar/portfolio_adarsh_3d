# Smart Industry 5.0: Digital Twin Based Predictive Maintenance System

> **Project Report Summary & Technical Specification**  
> **Academic Institution:** Department of Electronics and Communication Engineering (ECE), Manakula Vinayagar Institute of Technology, Puducherry (Affiliated to Pondicherry University)  
> **Degree:** Bachelor of Technology (B.Tech) in Electronics and Communication Engineering (2022 – 2026)  
> **Authors:** Narendra Prasad B (Reg: 22TC0246), Praveenkumar T (Reg: 22TC0260), Premraaj S (Reg: 22TC0262)  
> **Project Guide:** Mr. V. Rajesh, Assistant Professor, Department of ECE  
> **Recognition:** Unisys Innovation Program 2025 (UIP-2025) National Top 24 Finalist out of 8,000+ Teams  
> **Date:** May 2026  

---

## Executive Summary

Conventional manufacturing environments rely heavily on reactive maintenance—repairing machinery only after catastrophic failure—or rigid preventive schedules that ignore real-time equipment health. This leads to costly unplanned downtime, safety hazards, undetected toxic gas leaks, and severe operational losses.

**Smart Industry 5.0** (Digital Twin Based Predictive Maintenance System) is an integrated Cyber-Physical System (CPS) combining Industrial IoT (IIoT), Real-Time WebSockets telemetry, Azure Digital Twins (DTDL), Three.js 3D web graphics, Isolation Forest anomaly detection, and automated physical actuators. The system continuously tracks vibration levels, ambient temperature, hazardous gas concentrations (MQ2), and product throughput rates using an ESP8266 microcontroller. Data is streamed at sub-50ms latency to a 3D digital twin replica rendering a factory conveyor belt, boiler, and robotic arm in Three.js, automatically triggering servo-driven lubricant dispensers and emergency stops when predictive thresholds are breached.

---

## UN Sustainable Development Goals (SDGs) Alignment

![SDG Goal 9](smart_industry_images/page_05_img_02.png)  
![SDG Goal Mapping](smart_industry_images/page_05_img_01.png)

- **SDG Goal 9 (Industry, Innovation, and Infrastructure):** Builds resilient industrial infrastructure, fosters sustainable innovation, and reduces equipment waste by predicting mechanical wear before catastrophic breakdown. Affordable ESP8266 IoT nodes enable democratized Industry 5.0 adoption across food processing, automotive, and manufacturing sectors.

---

## Key System Accomplishments

- **Interactive 3D Digital Twin (Three.js + GLTF):** Real-time web-based 3D virtual replica of physical factory machinery (conveyor, boiler, robotic arm) mirroring physical state, speed, and thermal/vibration color alerts in real time.
- **Sub-50ms WebSockets Telemetry (`ws://`):** Full-duplex real-time communication between ESP8266 IoT hardware nodes and cloud web dashboards, bypassing high-latency HTTP polling.
- **Azure Digital Twins Integration (DTDL JSON-LD):** Modeled factory assets using Digital Twin Definition Language for cloud graph synchronization and enterprise SCADA scalability.
- **Isolation Forest & Statistical Anomaly Detection:** $s(x,\psi) = 2^{-\frac{E(h(x))}{c(n)}}$ anomaly scoring combined with Z-score normalized vibration monitoring ($V_{\text{norm}}$) and conveyor travel time tracking ($T_{\text{travel}}$).
- **Automated Physical Actuation:** Servo-driven automated lubricant dispenser triggers instantly upon detecting mechanical friction spikes, extending bearing lifespan.
- **Multi-Sensor Telemetry Array:** SW-420 Vibration sensor, MQ2 Gas/Smoke detector, IR Obstacle counter, LM35 Temperature sensor, and L298N Dual H-Bridge Motor Driver.

---

## Complete System Architecture & Data Flow

![Block Diagram of Smart Industry System](smart_industry_images/page_38_img_01.png)  
*Figure 3.2: Block Diagram of the Proposed Smart Industry 5.0 System*

![System Flowchart](smart_industry_images/page_37_img_01.png)  
*Figure 3.1: Flowchart of the Proposed Smart Industry 5.0 System*

```
[ Physical Sensing Layer ]
  SW-420 Vibration + MQ2 Gas + IR Counter + LM35 Temp + ESP8266 Wi-Fi MCU
       │ (Sub-50ms Full-Duplex WebSockets ws://)
       ▼
[ Ingestion & Cloud Layer ]
  Node.js WebSocket Server + Azure Digital Twins (DTDL JSON-LD Graph)
       │
       ▼
[ Predictive Analytics Engine ]
  Isolation Forest Anomaly Scoring + Z-Score Thresholding + Travel Time Calculation (T_travel)
       │
  ┌────┴───────────────────────────┐
  ▼                                ▼
[ Automated Physical Action ]   [ 3D Digital Twin & Web Dashboard ]
  Servo Lubricant Dispenser      Three.js GLTF 3D Factory Visualization (Color Alerting)
  L298N Emergency Motor Stop     Grafana & Web Analytics (KPI Panels)
```

---

## Hardware Setup & Sensor Circuitry Specifications

![Hardware Setup](smart_industry_images/page_38_img_02.png)  
*Figure 3.3: Hardware Setup of the Proposed System (ESP8266, Conveyor Belt, Sensors, Servo Lubricator)*

### 1. Hardware Component Inventory

| Component | Function / Specification |
|---|---|
| **ESP8266 NodeMCU** | 32-bit Tensilica L106 MCU @ 80MHz, Built-in Wi-Fi 802.11 b/g/n, ADC, GPIOs |
| **SW-420 Vibration Sensor** | Piezoelectric vibration sensor for motor bearing oscillation detection |
| **MQ2 Gas Sensor** | Electrochemical sensor detecting LPG, Smoke, CO, and Flammable gases |
| **IR Obstacle Sensor** | Infrared emitter-receiver pair for automated product counting ($P_{\text{rate}}$) |
| **L298N Motor Driver** | Dual H-Bridge driver regulating DC conveyor motor speed via PWM |
| **SG90 Servo Motor** | Precision 180° micro servo driving automated lubricant dispenser valve |
| **Industrial Conveyor & Boiler** | Scale physical testbed simulating factory material handling |

### 2. Predictive Anomaly & Mathematical Formulations

- **Normalized Vibration Score:**
  $$V_{\text{norm}} = \frac{V_{\text{raw}} - V_{\text{min}}}{V_{\text{max}} - V_{\text{min}}}$$
- **Conveyor Travel Time Monitoring:**
  $$T_{\text{travel}} = t_{\text{exit}} - t_{\text{entry}}$$
  If $T_{\text{travel}} > T_{\text{threshold}}$, a mechanical jam alert is dispatched and motor speed is adjusted via PWM duty cycle $D$.
- **Isolation Forest Anomaly Scoring:**
  $$s(x, \psi) = 2^{-\frac{E(h(x))}{c(n)}}$$
  Where $h(x)$ is path length, $c(n)$ is average path length of unsuccessful search in Binary Search Tree, and $s \ge 0.6$ triggers predictive maintenance alert.

---

## 3D Digital Twin & Web Dashboard Interface

![3D Digital Twin Visualization](smart_industry_images/page_41_img_01.png)  
*Figure 3.4: 3D Digital Twin Visualization in Three.js (Factory Conveyor, Boiler & Arm)*

![Web Dashboard](smart_industry_images/page_42_img_01.png)  
*Figure 3.5: Web Dashboard UI showing Real-Time Sensor Telemetry*

![Factory Dashboard Monitoring](smart_industry_images/page_49_img_01.png)  
*Figure 4.1: Live Factory Dashboard Monitoring Panel*

![3D Fault State Visualization](smart_industry_images/page_54_img_01.png)  
*Figure 4.4: 3D Fault State Visualization Showing Red Alert Condition On Conveyor Belt*

---

## Performance Analysis & Experimental Results

![WebSocket Latency Graph](smart_industry_images/page_50_img_01.png)  
*Figure 4.2: Latency Graph For WebSocket Communication (<50ms average latency)*

![Azure Digital Twin Latency](smart_industry_images/page_51_img_01.png)  
*Figure 4.3: Latency Graph For Azure Digital Twin Synchronization*

### Telemetry Latency Benchmarks

| Communication Protocol | Average Latency | Reliability Rate | Use Case |
|---|---|---|---|
| **WebSockets (`ws://`)** | **< 35 ms** | 99.8% | Real-Time 3D Digital Twin Motion Sync & Gauge Updates |
| **Azure Digital Twin Sync** | **< 120 ms** | 99.5% | Enterprise SCADA Cloud Graph State Updates |
| **MQTT Telemetry Fallback** | **< 65 ms** | 99.7% | Asynchronous Sensor Storage Data Pipeline |

---

## Comparative Matrix: Smart Industry 5.0 vs. Traditional Maintenance

| Feature / Metric | Reactive Maintenance | Preventive Maintenance | Standard SCADA IoT | **Smart Industry 5.0 (Proposed System)** |
|---|---|---|---|---|
| **Maintenance Trigger** | Equipment Failure | Fixed Calendar Schedule | Manual Threshold Alerts | **Predictive Machine Learning Anomaly Score** |
| **Digital Twin 3D View** | ❌ None | ❌ None | ❌ 2D Static Schematics | **✅ Real-Time Three.js 3D Virtual Replica** |
| **Telemetry Latency** | N/A | N/A | 1 – 5 seconds (Polling) | **✅ Sub-50ms WebSockets (`ws://`)** |
| **Automated Action** | ❌ None | ❌ Manual Service | ⚠️ Basic Relay Trip | **✅ Servo Lubricant Dispenser & PWM Speed Control** |
| **Sensor Network Cost** | High Replacement Cost | Moderate | High (PLC Hardware) | **✅ Low-Cost ESP8266 + Micro-Sensors** |

---

## Conclusion & Future Directions

### Conclusion

The **Smart Industry 5.0 Digital Twin Based Predictive Maintenance System** successfully bridges physical factory hardware and web 3D virtualization. Validated through experimental testing:
- Real-time 3D model synchronization at **<35ms WebSocket latency**.
- Early detection of motor friction spikes and gas leaks.
- Automated lubricant dispensing preventing bearing seizure.
- Recognized as a **Top 24 National Project** out of 8,000+ submissions in the **Unisys Innovation Program 2025 (UIP-2025)**.

### Future Scope

1. **Edge AI Anomaly Inference:** Deploying TensorFlow Lite Micro directly on ESP32 hardware nodes.
2. **AR / VR Maintenance Inspection:** Integrating WebXR for maintenance technicians to view holographic diagnostic overlays via AR headsets.
3. **Multi-Factory Fleet Management:** Scaling Azure Digital Twin graph models to monitor multi-site manufacturing plants globally.

---

*Report extracted and documented from `FINAL YEAR REPORT MODIFIED.pdf`.*
