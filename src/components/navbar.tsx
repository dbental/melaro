"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
];

export function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(9,9,11,0.82)] backdrop-blur-[20px] backdrop-saturate-[1.4] border-b border-border px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[68px]">
          <Logo className="text-white" />

          <div className="flex items-center gap-4 md:gap-7">
            {/* Desktop nav links with active state */}
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "hidden md:block font-medium text-[0.94rem] transition-colors cursor-pointer border-b-2 pb-0.5",
                    active
                      ? "text-foreground border-primary"
                      : "text-muted-foreground hover:text-foreground border-transparent",
                  )}
                >
                  {link.label}
                </a>
              );
            })}

            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center min-h-[44px] rounded-[10px] px-5 text-[0.94rem] font-semibold text-muted-foreground border border-border hover:border-[rgba(255,255,255,0.15)] hover:text-foreground transition-all"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[10px] px-5 text-[0.94rem] font-semibold text-white bg-primary btn-brand"
            >
              Get Started
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60] bg-black/60"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Slide-in drawer from right */}
      <div
        className={cn(
          "md:hidden fixed top-0 right-0 z-[70] h-full w-72 flex flex-col bg-card border-l border-border transform transition-transform duration-200",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-border">
          <Logo className="text-foreground" />
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-muted-foreground hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setDrawerOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            Log in
          </Link>
        </nav>

        {/* Full-width amber CTA at drawer bottom */}
        <div className="px-4 pb-8">
          <Link
            href="/signup"
            className="flex items-center justify-center w-full min-h-[48px] rounded-[10px] text-sm font-semibold text-white bg-primary btn-brand"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
