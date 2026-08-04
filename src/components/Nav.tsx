"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Orbit } from "lucide-react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Why Ambit", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const unlockScroll = () => {
    if (typeof document === "undefined") return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      unlockScroll();
    }

    return () => {
      unlockScroll();
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    // 1. Immediately close menu and unlock scroll synchronously
    setOpen(false);
    unlockScroll();

    if (typeof window === "undefined") return;

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);

    if (!target) {
      window.location.assign(href);
      return;
    }

    // 2. Allow DOM to unlock overflow before initiating smooth scroll
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled ? "bg-ink/80 backdrop-blur-lg border-b border-ink-line" : "bg-transparent"
          }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-18 py-4">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick("#top");
            }}
            className="flex items-center gap-2 group"
          >
            <span className="relative w-8 h-8 rounded-full border border-indigo-soft/50 flex items-center justify-center">
              <Orbit className="w-4 h-4 text-lime transition-transform duration-700 group-hover:rotate-180" />
            </span>
            <span className="font-display font-semibold text-lg tracking-tight">
              Ambit
            </span>
          </a>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(l.href);
                }}
                className="text-sm text-slate hover:text-paper transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                handleNavClick("#contact");
              }}
              className="mono-label text-xs px-5 py-2.5 rounded-full bg-paper text-ink font-medium hover:bg-lime transition-colors duration-300"
            >
              Get a demo
            </a>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-2 -mr-2 text-paper focus:outline-none"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, pointerEvents: "none" as const }}
            animate={{ opacity: 1, pointerEvents: "auto" as const }}
            exit={{ opacity: 0, pointerEvents: "none" as const }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink grain md:hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between px-6 h-18 py-4">
                <span className="font-display font-semibold text-lg">Ambit</span>
                <button
                  onClick={() => {
                    setOpen(false);
                    unlockScroll();
                  }}
                  aria-label="Close menu"
                  className="p-2 -mr-2 text-paper"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <motion.div className="flex flex-col px-6 mt-6 gap-2">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(l.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="font-display text-3xl py-3 border-b border-ink-line text-paper hover:text-lime transition-colors"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick("#contact");
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mono-label text-xs mt-6 px-6 py-4 rounded-full bg-lime text-ink font-medium text-center"
                >
                  Get a demo
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
