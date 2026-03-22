import { Logo } from "./logo";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-card-border px-8 pt-16 pb-8 max-w-[1200px] mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
        <div>
          <Logo className="mb-4 inline-block" />
          <p className="text-[0.85rem] text-fg-dim max-w-[280px]">
            Autonomous AI orchestration. Build teams that plan, collaborate, and
            deliver in perfect harmony.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-heading text-[0.9rem] mb-4">{title}</h4>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-[0.85rem] text-fg-dim mb-[0.6rem] hover:text-primary-bright transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-card-border pt-6 text-[0.8rem] text-fg-dim flex flex-col sm:flex-row justify-between gap-2">
        <span>2026 Melaro. All rights reserved.</span>
        <span>Crafted with precision.</span>
      </div>
    </footer>
  );
}
