"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, UserSquare2, Receipt, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MODULES = [
  {
    key: "leads",
    icon: Users,
    tag: "01",
    title: "Lead Management",
    tagline: "Never let a lead go cold.",
    description:
      "Capture leads the moment they arrive, route them to the right rep automatically, and track every touchpoint from first click to closed deal.",
    points: [
      "Automatic lead capture from web forms & connectors",
      "Smart routing & round-robin assignment",
      "Pipeline stages built around how you actually sell",
      "Follow-up reminders so nothing slips through",
    ],
  },
  {
    key: "hrms",
    icon: UserSquare2,
    tag: "02",
    title: "HRMS",
    tagline: "Run your team without the paperwork.",
    description:
      "Attendance, leave, onboarding and payroll-ready data — managed in the same place your sales team already lives.",
    points: [
      "Geo-tagged attendance & shift tracking",
      "Leave requests and approvals in two taps",
      "Employee directory with roles & documents",
      "Payroll-ready exports, every cycle",
    ],
  },
  {
    key: "invoicing",
    icon: Receipt,
    tag: "03",
    title: "Invoicing",
    tagline: "Get paid without leaving the CRM.",
    description:
      "Generate GST-ready invoices straight from a closed deal, track payment status, and keep billing and sales in sync automatically.",
    points: [
      "One-click invoice from any won deal",
      "GST-compliant templates & auto numbering",
      "Payment status synced to the customer record",
      "Recurring invoices for retainers & AMCs",
    ],
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-header-anim", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".feat-tab-item", {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".feat-tabs",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const activeModule = MODULES[active];

  return (
    <section id="features" ref={sectionRef} className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <div className="feat-header-anim mono-label text-xs text-indigo-soft mb-4">
            Core modules
          </div>
          <h2 className="feat-header-anim font-display font-semibold text-4xl sm:text-5xl tracking-tight leading-tight">
            Three systems your business needs. One place they finally meet.
          </h2>
          <p className="feat-header-anim mt-5 text-slate text-lg leading-relaxed">
            Most CRMs stop at the pipeline. Ambit keeps going — into HR and
            billing — so your whole operation runs off the same record.
          </p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6 lg:gap-10">
          {/* tab list */}
          <div className="feat-tabs flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              const isActive = i === active;
              return (
                <button
                  key={m.key}
                  onClick={() => setActive(i)}
                  className={`feat-tab-item group relative shrink-0 lg:w-full text-left rounded-2xl border px-6 py-5 transition-colors duration-300 ${
                    isActive
                      ? "border-indigo-soft/60 bg-ink-soft"
                      : "border-ink-line bg-transparent hover:border-slate-dim"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isActive ? "bg-lime text-ink" : "bg-ink-soft text-slate"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-[10rem]">
                      <div className="mono-label text-[10px] text-slate-dim mb-0.5">
                        {m.tag}
                      </div>
                      <div className="font-display font-medium text-lg whitespace-nowrap lg:whitespace-normal">
                        {m.title}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="active-feature-bar"
                      className="hidden lg:block absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-lime"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div className="relative rounded-3xl border border-ink-line bg-ink-soft/60 p-8 sm:p-12 min-h-[420px] overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo/15 blur-[100px]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="mono-label text-xs text-lime mb-3">
                  {activeModule.tagline}
                </div>
                <h3 className="font-display font-semibold text-3xl sm:text-4xl mb-4">
                  {activeModule.title}
                </h3>
                <p className="text-slate text-lg leading-relaxed max-w-xl mb-8">
                  {activeModule.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {activeModule.points.map((p, idx) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.07, duration: 0.4 }}
                      className="flex items-start gap-3 text-sm text-paper/90"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-lime/15 text-lime flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
