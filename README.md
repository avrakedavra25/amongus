# 🚀 Among Us Live — IIIT Bhopal Hostel Edition

> **An immersive, game-authentic web platform for the live campus event organized by SPARK, IIIT Bhopal.**

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

---

## 🛰️ Overview

Welcome to the official landing and registration portal for **Among Us Live**, hosted entirely within student hostels by **SPARK (IIIT Bhopal)**. 

No campus commute required—the entire deduction, deception, and task-running tournament unfolds inside your residence corridors!

---

## ✨ Features & Game Authenticity

- **🎮 Authentic Skeld Aesthetic**: CRT scanline overlays, pixel-perfect borders, Innersloth-inspired color palettes, and retro sci-fi typography.
- **🤫 Iconic "SHHHHHHH!" Experience**: Mouse-hover interactive Shhhh screen powered by the real in-game sound effect with a Web Audio synthesizer fallback.
- **🚨 Interactive Cafeteria Hub**:
  - Central Meeting Table featuring a protective safety glass case and a circular emergency button.
  - Interactive laptops acting as **Task Testers** that open classified event dossiers (Event Info, Rules of Engagement, Bounty & Loot, Helpdesk FAQ).
- **💥 Full-Screen Emergency Meeting Cutscene**: Dramatic flashing siren animation and alarms when the emergency button or header register button is clicked.
- **🗺️ Hostel Sector Tactical Map**:
  - Interactive radar sector selector covering **H1**, **H3**, **H4**, **H5**, **PnT**, and **Girls Hostels**.
- **💳 Skeld Admin Swipe-Card Registration**:
  - Drag-and-swipe ID card verification mini-game.
  - Form validation with Scholar Number, Branch, Contact, and Crewmate Color customizer.
  - Victorious emergency siren and victory confetti upon completion.
- **☁️ Dual-Mode Persistence**:
  - Direct cloud integration with **Supabase**.
  - Automatic, seamless fallback to client-side **`localStorage`** when offline.
- **♿ Accessibility & Sound Controls**:
  - Full keyboard navigation (`Esc` to dismiss, focus trapping in dialogs).
  - Global audio mute toggle in the cockpit header.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom CRT scanline and neon hazard utilities
- **Icons**: [Lucide React](https://lucide.dev/)
- **VFX & Animations**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backend / DB**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/avrakedavra25/amongus.git
   cd amongus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Copy `.env.example` to `.env` and fill in your Supabase credentials if using cloud persistence:
   ```bash
   cp .env.example .env
   ```
   *(If omitted, registrations will gracefully save to browser `localStorage` in offline mode).*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
AmongUs/
├── public/                 # Static assets (audio, SVG sprites, shhh graphics)
│   ├── shhh.mp3            # Authentic in-game sound effect
│   ├── shhh.png            # Shhhhh screen visual
│   ├── crewmate.svg        # Scalable crewmate sprite
│   └── skeld-cafeteria.svg # Vector map background
├── src/
│   ├── assets/             # Reusable SVG crewmate characters
│   ├── components/         # Core UI & Game sections
│   │   ├── CafeteriaHero.tsx           # Interactive central meeting table & button
│   │   ├── HeroHookSection.tsx         # Top hook banner with hover-activated Shhhh card
│   │   ├── EmergencyCutscene.tsx       # Fullscreen red alert sirens & cutscene
│   │   ├── HostelMapSelect.tsx         # Tactical hostel sector selection
│   │   ├── SwipeCardRegistration.tsx   # Admin card swipe & registration form
│   │   ├── TaskTesterModal.tsx         # Terminal dossiers (Info, Rules, Loot, FAQ)
│   │   ├── DeepSpaceSections.tsx       # Deep space wiki snapshot cards
│   │   ├── Header.tsx                  # Space cockpit navigation & sound toggle
│   │   └── Footer.tsx                  # Skeld ship reactor telemetry & footer
│   ├── config/             # Event configuration (dates, rules, FAQs, sectors)
│   ├── hooks/              # Custom hooks (modal accessibility, focus trapping)
│   ├── lib/                # Audio synthesizer & Supabase client handlers
│   ├── App.tsx             # Main application orchestrator
│   └── main.tsx            # React application entry point
├── supabase/               # SQL migrations for registrations table
└── docs/                   # Visual design references
```

---

## 🛡️ Security & Privacy

- Client environment variables (`VITE_*`) only expose public publishable credentials.
- Sensitive environment files (`.env`, `.env.*`) are strictly prevented from version control via `.gitignore`.
- Row-Level Security (RLS) policies in `supabase/migrations/` ensure registrations can only be inserted publicly without leaking existing records.

---

## 📜 License

Created for the IIIT Bhopal student community by **SPARK**. All original game assets, visual motifs, and themes are inspired by **Among Us** by **Innersloth**.

