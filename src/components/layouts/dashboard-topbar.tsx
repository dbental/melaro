"use client";

import { Bell, LogOut, Menu, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMobileNav } from "@/components/layouts/mobile-nav-context";

interface Props {
  title: string;
  orgName: string;
}

export function DashboardTopbar({ title, orgName }: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openNav } = useMobileNav();

  async function handleSignOut() {
    try {
      await authClient.signOut();
    } catch {
      // no-op in dev bypass mode
    }
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        {/* Hamburger — only visible on mobile */}
        <button
          onClick={openNav}
          className="md:hidden p-2 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{orgName}</p>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications placeholder */}
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Bell size={16} />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <User size={12} className="text-primary" />
            </div>
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-xl border border-border bg-card shadow-lg py-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
