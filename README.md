# Ambit — 360° CRM Experience

> A motion-first marketing and product showcase for **Ambit**: a unified platform bridging lead capture, HR operations, invoicing, and external channel connectors under a single orbital design system.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-88ce02?style=flat-square)](https://gsap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Component_State-0055ff?style=flat-square)](https://framer.com/motion)

[**Live Demo**](https://your-vercel-deployment.app) • [**Loom Video Walkthrough**](https://loom.com/share/your-video-id)

---

## The Concept

Most CRMs feel like glorified spreadsheets wrapped in dull grey boxes. **Ambit** takes a different approach: treat data like a living system. Every lead source, invoice cycle, and team milestone revolves around a central customer nucleus—visualized through custom SVG orbit physics, fluid tab transitions, and scroll-driven telemetry counters.

---

## Core Architecture & Motion Mechanics

Instead of relying on heavy pre-packaged UI kits, every interaction is custom-built by blending **GSAP** for spatial dynamics with **Framer Motion** for state-driven component transitions.

### 1. The Orbital Engine (`src/components/OrbitVisual.tsx`)
- **Physics-Inspired Motion:** SVG orbits spin continuously via a scoped `gsap.context()` timeline.
- **Upright Labels:** Satellites counter-rotate at equal angular velocity so text badges remain readable at 360°.
- **Radar Telemetry:** Concentric pulse rings fade outward infinitely to anchor the hero visual.

### 2. Tabbed Product Matrix (`src/components/Features.tsx`)
- **Scroll Entry:** Revealed dynamically via `ScrollTrigger` as the user moves down the page.
- **State Swapping:** Switching between Lead Management, HRMS, and Invoicing triggers an `AnimatePresence` crossfade-and-slide motion sequence.

### 3. Infinite Integration Marquee (`src/components/Integrations.tsx`)
- **Continuous Ticker:** A twin-track GSAP loop pushes third-party lead sources (Facebook Lead Ads, IndiaMART, 99acres, Housing.com) seamlessly across the viewport.
- **Interactive Cards:** Hover states leverage Framer Motion spring physics for tactile micro-feedback.

### 4. Live Telemetry Counters (`src/components/WhyChooseUs.tsx`)
- **Direct DOM Interpolation:** Rather than importing a heavy counter package, GSAP animates raw JS numbers and writes rounded strings straight to the DOM when scrolled into view.

### 5. Interactive Form Flow (`src/components/Contact.tsx`)
- **Spring States:** Real-time form focus states and a layout-spring transition into the success view upon simulated dispatch.

---

## Tech Stack

| Domain | Technology | Implementation Detail |
|---|---|---|
| **Framework** | Next.js 15 (App Router) + TypeScript | Strict type safety, file-based routing, server-rendered shell |
| **Styling** | Tailwind CSS v4 | CSS variables theme engine with low runtime overhead |
| **Canvas & Scroll Motion** | GSAP 3 + ScrollTrigger | Timeline choreography, infinite rotation loops, count-ups |
| **Component UI Motion** | Framer Motion | Layout springs, `AnimatePresence` tab swaps, staggered lists |
| **Iconography** | Lucide React | Lightweight vector icons matching font stroke weights |

---

## Design Tokens

- **Background:** Deep Ink Navy (`#0B0E1A`)
- **Typography / Text:** Soft Warm Paper (`#F7F5F0`)
- **Primary Accent:** Electric Indigo (`#5B4FFF`)
- **Kinetic Accent:** Acid Lime (`#C8FF4D`)
- **Typography Stack:** 
  - *Display:* Space Grotesk
  - *Body:* Inter
  - *Data / Micro-copy:* JetBrains Mono

---

## Directory Blueprint

```
src/
├── app/
│   ├── layout.tsx         # Global typography imports & metadata
│   ├── page.tsx           # Orchestrates page sections
│   └── globals.css        # Tailwind v4 theme setup & color tokens
├── components/
│   ├── Nav.tsx            # Scroll-reactive sticky nav + mobile drawer
│   ├── Hero.tsx           # Entrance stagger sequence & headline block
│   ├── OrbitVisual.tsx    # Signature GSAP multi-ring orbit visualizer
│   ├── Features.tsx       # Tabbed product modules & detailed breakdown
│   ├── Integrations.tsx   # Seamless ticker marquee & integration cards
│   ├── WhyChooseUs.tsx    # Scroll-triggered live count-up stats
│   ├── Contact.tsx        # Interactive demo booking form
│   └── Footer.tsx         # Brand footer & navigation links
└── lib/
    └── utils.ts           # Class merging helper (`clsx` + `tailwind-merge`)
```

---

## Getting Started

### Prerequisites
Node.js 18+ and `npm` installed locally.

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ambit-crm-site.git
   cd ambit-crm-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & Deployment

### Build Locally

```bash
npm run build
npm run start
```

### Deploy to Vercel

1. Push your changes to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Vercel auto-detects Next.js defaults. No custom environment variables are required.

Or deploy instantly via CLI:
```bash
npm i -g vercel
vercel
```

---

## Implementation Notes

- **Form Handler:** `src/components/Contact.tsx` simulates an asynchronous server response with a timeout delay. Swap out the simulated submit handler with your API endpoint or CRM webhook to hook into production leads.
- **Brand Assets:** External platform connectors (IndiaMART, Facebook Lead Ads, etc.) use custom styled wordmarks to maintain visual consistency across dark modes.
- **Accessibility:** `prefers-reduced-motion` is configured globally in `globals.css` to respect user motion settings, and keyboard focus states are preserved throughout interactive components.
