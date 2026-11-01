# TECH RIDE — The Journey of an Innovator
### Personal 3D Motorcycle Exploration Developer Portfolio

> **Deepak S**  
> First-Year B.Tech Information Technology Student  
> Sri Eshwar College of Engineering, Coimbatore, Tamil Nadu  
> Aspiring Software Developer | AI Enthusiast | Technology Explorer

---

## 🏍️ Concept Overview

**TECH RIDE** transforms the traditional personal developer portfolio into an immersive, interactive 3D motorcycle exploration road trip. Rather than scrolling through ordinary flat web pages, visitors navigate through Deepak's world by riding a customized motorcycle along a scenic, winding South Indian highway (inspired by NH-47 in Tamil Nadu).

### Visual & Technical Direction:
- **Semi-Realistic 3D Game Graphics**: Natural, stylized South Indian road environment featuring asphalt curves, road markings, coconut palms, neem/banyan trees, electric utility poles, milestone distance pillars, roadside tea stalls, and village bus shelters.
- **Physical 3D Roadside Destination Signboards**: Realistic green highway boards positioned beside the road at curve milestones. Approaching or clicking a board opens an in-depth exhibition for that portfolio section.
- **Procedural Motorcycle Kinematics**: An articulated 3D motorcycle that follows the curved road spline (`CatmullRomCurve3`), banks/leans naturally into left and right curves, spins wheels relative to speed, and projects a glowing LED headlight beam onto the road ahead.
- **Google Maps–Inspired GPS Navigation HUD**: A live trip computer with speedometer (km/h), odometer (km), trip progress bar, horn button, audio toggle, Eco/8GB RAM mode switch, and an interactive "Where would you like to go?" destination drawer.
- **Procedural Web Audio API Synthesizer**: Self-contained engine ignition, throttle revs, gear shift clicks, horns, and ambient sounds synthesized in real-time without bulky audio files (OFF by default for accessibility).

---

## 🗺️ Journey Milestones Along the Road

| Milestone | Station Name | Key Features / Content |
|---|---|---|
| **KM 0.0** | **START // HERO** | Deepak S intro, animated roles, 3D motorcycle launchpad, resume download |
| **KM 0.8** | **ABOUT ME** | Digital Identity, biography, education at Sri Eshwar College of Engineering, career aspirations |
| **KM 1.8** | **PROJECTS** | Interactive 3D exhibition of 6 authentic projects (DeepKart, FactoryMind AI, WhatsApp AI Center, Padika AI, Smart Parking, Smart Street Light) |
| **KM 2.8** | **SKILLS ARSENAL** | Categorized technical capability (Programming Languages, Web Development, AI/ML, Tools, and Hardware & Emerging Tech marked honestly as Interests) |
| **KM 3.7** | **EDUCATION** | Academic foundation, coursework in C/C++, Data Structures, and Digital Logic at SECE |
| **KM 4.6** | **ACHIEVEMENTS** | Timeline of student hackathons, coding contests, and verified credential placeholders |
| **KM 5.5** | **BEYOND SOFTWARE** | Physical computing bench featuring an interactive 3D Microcontroller Board (ESP32/Arduino) with component tooltips and software-hardware bridge analysis |
| **KM 6.2** | **CONTACT TERMINAL** | Encrypted transmission terminal with input validation, mailto fallback, and verified social placeholders |

---

## 🕹️ Controls & Navigation

- **Scroll Wheel**:
  - Scroll **Down**: Drive forward along the winding road
  - Scroll **Up**: Drive backward along previously visited route
- **Keyboard**:
  - **Down Arrow** / **Right Arrow** / **S** / **D**: Accelerate forward
  - **Up Arrow** / **Left Arrow** / **W** / **A**: Ride backward
  - **Spacebar** or **H Key**: Honk the motorcycle horn
- **GPS HUD ("WHERE TO?")**:
  - Click any destination to either **RIDE** the bike smoothly to that milestone or **VIEW** the content immediately.
- **Roadside 3D Signboards**:
  - Click any 3D green highway signboard directly from the motorcycle camera to open that station's exhibition.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Styling**: Tailwind CSS + Custom Cyberpunk/Stylized Glassmorphism utilities
- **Icons**: Lucide React
- **Audio Subsystem**: Custom Procedural Web Audio API Sound Synthesizer (`src/audio/soundEffects.ts`)
- **Deployment Ready**: Optimized for Vercel, Netlify, or GitHub Pages

---

## ⚡ Performance Optimization for 8GB RAM Laptops

- **Procedural Low-Overhead Meshes**: Geometries and soldermasks are generated procedurally, eliminating heavy external 3D file downloads.
- **Clamped Device Pixel Ratio (DPR)**: Capped at `[1, 1.5]` to avoid GPU memory choking on high-resolution displays.
- **Eco / 8GB RAM Mode**: Toggleable from the top GPS HUD to disable real-time shadow passes and reduce particle counts for maximum battery life and frame rate.
- **WebGL Fallback**: Includes fallback UI if WebGL is unavailable on older devices.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended, v26 verified)
- npm

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Start Development Server
\`\`\`bash
npm run dev
\`\`\`
The application will launch at `http://localhost:3000/`.

### 3. Build for Production
\`\`\`bash
npm run build
\`\`\`
Generates a minified, production-ready bundle in the `dist/` directory.

---

## ✏️ Personalization & Easy Customization

All data is decoupled into clean, typed configuration files:
- **Projects**: Edit `src/data/projects.ts` to add GitHub repository links, live demos, and update project statuses (`Prototype`, `In Development`, `Concept`).
- **Skills**: Edit `src/data/skills.ts` to update language proficiencies and hardware interests.
- **Journey & Credentials**: Edit `src/data/journey.ts` to update hackathon wins and verified certifications.
- **Contact Details**: Edit `src/components/sections/ContactSection.tsx` to link personal email, LinkedIn, and GitHub profiles.

---

## 📜 License & Attribution

Designed and engineered for Deepak S's personal portfolio.  
Department of Information Technology, Sri Eshwar College of Engineering.
