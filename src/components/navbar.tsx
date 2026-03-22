import Link from "next/link";
import { Logo } from "./logo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(9,9,11,0.82)] backdrop-blur-[20px] backdrop-saturate-[1.4] border-b border-card-border px-8">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[68px]">
        <Logo />

        <div className="flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden md:block text-fg-dim font-medium text-[0.88rem] hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/login"
            className="rounded-[10px] px-[1.4rem] py-[0.6rem] text-[0.88rem] font-semibold text-fg-muted border border-card-border hover:border-[rgba(255,255,255,0.15)] hover:text-foreground transition-all"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-[10px] px-[1.4rem] py-[0.6rem] text-[0.88rem] font-semibold text-white bg-gradient-to-br from-primary-deep to-accent-deep btn-glow"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
