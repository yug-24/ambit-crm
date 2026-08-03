"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Gauge, Layers, Headset } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 98, suffix: "%", label: "Uptime, measured monthly" },
  { value: 4, suffix: " min", label: "Average lead-to-assignment time" },
  { value: 30, suffix: "+", label: "Native connectors" },
  { value: 1, suffix: "", label: "Login for sales, HR & billing" },
];

const BENEFITS = [
  {
    icon: Layers,
    title: "Everything connected, nothing duplicated",
    description:
      "One customer record feeds leads, HR and invoicing. Update it once — it's correct everywhere.",
  },
  {
    icon: Gauge,
    title: "Built for speed, not just features",
    description:
      "Sub-second search, instant lead capture, no lag on mobile. Your team shouldn't wait on software.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description:
      "Role-based access, encrypted data at rest and in transit, and full audit trails on every record.",
  },
  {
    icon: Headset,
    title: "Real onboarding, real support",
    description:
      "A dedicated setup specialist and human support — not a chatbot reading you the FAQ.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      STATS.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });

      gsap.from(".why-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".why-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <div className="why-header mono-label text-xs text-indigo-soft mb-4">
            Why Ambit
          </div>
          <h2 className="why-header font-display font-semibold text-4xl sm:text-5xl tracking-tight leading-tight">
            Software your team actually wants to open every morning.
          </h2>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 border-y border-ink-line py-10">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <div className="font-display font-semibold text-4xl sm:text-5xl text-paper flex items-baseline">
                <span ref={(el) => { numberRefs.current[i] = el; }}>0</span>
                <span className="text-lime">{s.suffix}</span>
              </div>
              <p className="text-sm text-slate mt-2 leading-snug max-w-[16ch]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="why-grid grid sm:grid-cols-2 gap-6">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="why-card group rounded-2xl border border-ink-line p-8 hover:border-indigo-soft/50 hover:bg-ink-soft/50 transition-colors duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-ink-soft flex items-center justify-center mb-6 group-hover:bg-lime group-hover:text-ink transition-colors duration-300 text-slate">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-medium text-xl mb-2.5">{b.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
