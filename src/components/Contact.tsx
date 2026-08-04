"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamSize, setTeamSize] = useState(TEAM_SIZES[1]);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulated submission — wire up to your form endpoint / CRM webhook.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1100);
  }

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 rounded-3xl border border-ink-line bg-ink-soft/50 p-8 sm:p-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo/15 blur-[140px]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="mono-label text-xs text-indigo-soft mb-4">Get started</div>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight leading-tight mb-6">
              See Ambit running on your own data — in 20 minutes.
            </h2>
            <p className="text-slate text-lg leading-relaxed mb-10 max-w-md">
              No generic sandbox. We&apos;ll walk through leads, HR and invoicing
              set up the way your team actually works.
            </p>

            <div className="space-y-5">
              <a href="mailto:hello@ambitcrm.io" className="flex items-center gap-4 text-sm text-paper/90 hover:text-lime transition-colors">
                <span className="w-10 h-10 rounded-full bg-ink flex items-center justify-center border border-ink-line">
                  <Mail className="w-4 h-4" />
                </span>
                hello@ambitcrm.io
              </a>
              <a href="tel:+919999999999" className="flex items-center gap-4 text-sm text-paper/90 hover:text-lime transition-colors">
                <span className="w-10 h-10 rounded-full bg-ink flex items-center justify-center border border-ink-line">
                  <Phone className="w-4 h-4" />
                </span>
                +91 99999 99999
              </a>
              <div className="flex items-center gap-4 text-sm text-paper/90">
                <span className="w-10 h-10 rounded-full bg-ink flex items-center justify-center border border-ink-line">
                  <MapPin className="w-4 h-4" />
                </span>
                Ahmedabad, Gujarat · Remote-friendly
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl bg-ink border border-ink-line p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[420px] flex flex-col items-center justify-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                  >
                    <CheckCircle2 className="w-14 h-14 text-lime mb-6" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-2xl mb-2">Request received</h3>
                  <p className="text-slate max-w-xs">
                    Someone from our team will reach out within one business day to set up your walkthrough.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" name="name" placeholder="Yug Bhatt" required />
                    <Field label="Work email" name="email" type="email" placeholder="yug@xyz.com" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Company" name="company" placeholder="INSTA BIZ WEB" required />
                    <Field label="Phone" name="phone" type="tel" placeholder="+91 123456789" />
                  </div>

                  <div>
                    <label className="mono-label text-[11px] text-slate mb-2 block">
                      Team size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TEAM_SIZES.map((size) => (
                        <button
                          type="button"
                          key={size}
                          onClick={() => setTeamSize(size)}
                          className={`px-4 py-2 rounded-full text-sm border transition-colors duration-200 ${
                            teamSize === size
                              ? "bg-lime text-ink border-lime"
                              : "border-ink-line text-slate hover:border-slate-dim"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mono-label text-[11px] text-slate mb-2 block">
                      What are you hoping to solve?
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="e.g. leads scattered across IndiaMART and Facebook, no single dashboard"
                      className="w-full bg-ink-soft border border-ink-line rounded-xl px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:outline-none focus:border-indigo-soft transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group inline-flex items-center justify-center gap-2 bg-paper text-ink font-medium px-7 py-4 rounded-full hover:bg-lime transition-colors duration-300 disabled:opacity-60"
                  >
                    {loading ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Request my demo
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-dim text-center">
                    No credit card. No spam. Just a straight walkthrough.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mono-label text-[11px] text-slate mb-2 block" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-ink-soft border border-ink-line rounded-xl px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:outline-none focus:border-indigo-soft transition-colors"
      />
    </div>
  );
}
