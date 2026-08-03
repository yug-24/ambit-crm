import { Orbit } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Lead Management", "HRMS", "Invoicing", "Integrations", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "API Docs", "Status", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-line py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] gap-12 mb-16">
          <div>
            <a href="#top" className="flex items-center gap-2 mb-5">
              <span className="w-8 h-8 rounded-full border border-indigo-soft/50 flex items-center justify-center">
                <Orbit className="w-4 h-4 text-lime" />
              </span>
              <span className="font-display font-semibold text-lg">Ambit</span>
            </a>
            <p className="text-sm text-slate max-w-xs leading-relaxed">
              The 360° CRM for teams that run leads, people and billing off
              one connected record.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mono-label text-[11px] text-slate-dim mb-4">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-slate hover:text-paper transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-ink-line pt-8 text-xs text-slate-dim">
          <span>© {new Date().getFullYear()} Ambit CRM. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-paper transition-colors">Privacy</a>
            <a href="#" className="hover:text-paper transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
