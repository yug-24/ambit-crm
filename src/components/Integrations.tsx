"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownToLine, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE = [
  "Facebook Lead Ads",
  "IndiaMART",
  "99acres",
  "Housing.com",
  "MagicBricks",
  "Google Sheets",
  "WhatsApp Business",
  "Sulekha",
  "JustDial",
  "Website Forms",
];

const FEATURED = [
  {
    name: "Facebook Lead Ads",
    initials: "FB",
    color: "#5B4FFF",
    detail: "Instant sync the moment someone submits your ad form.",
  },
  {
    name: "IndiaMART",
    initials: "IM",
    color: "#C8FF4D",
    detail: "Every buyer inquiry lands straight in your pipeline.",
  },
  {
    name: "99acres",
    initials: "99",
    color: "#8B82FF",
    detail: "Property leads mapped to the right agent automatically.",
  },
  {
    name: "Housing.com",
    initials: "HG",
    color: "#5B4FFF",
    detail: "No manual exports — inquiries flow in real time.",
  },
];

export default function Integrations() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = marqueeRef.current;
      if (track) {
        const width = track.scrollWidth / 2;
        gsap.to(track, {
          x: -width,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.from(".int-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".int-grid",
          start: "top 78%",
        },
      });

      gsap.from(".int-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative py-28 lg:py-36 bg-ink-soft/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <div className="int-header mono-label text-xs text-indigo-soft mb-4">
            Connectors
          </div>
          <h2 className="int-header font-display font-semibold text-4xl sm:text-5xl tracking-tight leading-tight">
            Your leads already exist somewhere. Ambit goes and gets them.
          </h2>
          <p className="int-header mt-5 text-slate text-lg leading-relaxed">
            Connect the portals and channels you already use — leads land in
            Ambit automatically, with source, cost and context intact.
          </p>
        </div>
      </div>

      {/* marquee */}
      <div className="relative overflow-hidden py-4 mb-16 border-y border-ink-line">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent z-10" />
        <div ref={marqueeRef} className="flex gap-4 w-max">
          {[...MARQUEE, ...MARQUEE].map((name, i) => (
            <div
              key={i}
              className="mono-label text-xs text-slate border border-ink-line rounded-full px-5 py-2.5 flex items-center gap-2 whitespace-nowrap"
            >
              <Zap className="w-3 h-3 text-lime" />
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="int-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED.map((c) => (
            <motion.div
              key={c.name}
              className="int-card group relative rounded-2xl border border-ink-line bg-ink p-6 overflow-hidden"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
                style={{ background: c.color }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-semibold text-sm mb-6 border"
                style={{ borderColor: c.color, color: c.color }}
              >
                {c.initials}
              </div>
              <h3 className="font-display font-medium text-lg mb-2">{c.name}</h3>
              <p className="text-sm text-slate leading-relaxed">{c.detail}</p>
              <div className="mt-5 flex items-center gap-2 text-xs text-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowDownToLine className="w-3.5 h-3.5" />
                Auto-synced to pipeline
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-dim mt-10">
          ...plus 25+ more connectors, and an open API for anything custom.
        </p>
      </div>
    </section>
  );
}
