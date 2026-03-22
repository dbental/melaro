import Link from "next/link";
import { Logo } from "./logo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(9,9,11,0.82)] backdrop-blur-[20px] backdrop-saturate-[1.4] border-b border-card-border px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[68px]">
        <Logo />

        <div className="flex items-center gap-4 md:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden md:block text-fg-muted font-medium text-[0.94rem] hover:text-foreground transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] rounded-[10px] px-5 text-[0.94rem] font-semibold text-fg-muted border border-card-border hover:border-[rgba(255,255,255,0.15)] hover:text-foreground transition-all cursor-pointer"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center min-h-[44px] rounded-[10px] px-5 text-[0.94rem] font-semibold text-white bg-gradient-to-br from-primary-deep to-accent-deep btn-glow cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
