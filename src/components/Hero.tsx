"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import OrbitVisual from "./OrbitVisual";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 grain">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-lime/10 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 mono-label text-xs text-lime border border-lime/25 bg-lime/5 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            One workspace. Every workflow.
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-semibold text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem] tracking-tight"
          >
            The 360° CRM that runs your{" "}
            <span className="text-gradient">entire business</span>, not just your pipeline.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 text-lg text-slate max-w-xl leading-relaxed"
          >
            Ambit brings leads, people, and billing into one connected record —
            and pulls leads straight in from Facebook, IndiaMART, 99acres,
            Housing and dozens more, automatically.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-paper text-ink font-medium px-7 py-4 rounded-full hover:bg-lime transition-colors duration-300"
            >
              Get a free demo
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="group inline-flex items-center gap-2 text-paper font-medium px-2 py-4"
            >
              <PlayCircle className="w-5 h-5 text-slate group-hover:text-lime transition-colors" />
              See how it works
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg border-t border-ink-line pt-8"
          >
            {[
              ["4", "modules, one login"],
              ["30+", "lead connectors"],
              ["0", "spreadsheets needed"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-semibold text-paper">{n}</div>
                <div className="text-xs text-slate mt-1 leading-snug">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <OrbitVisual />
        </motion.div>
      </div>
    </section>
  );
}
