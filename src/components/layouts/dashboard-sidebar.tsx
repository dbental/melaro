"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Bot,
  Activity,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "", icon: LayoutDashboard, exact: true },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Agents", href: "/agents", icon: Bot },
  { label: "Approvals", href: "/approvals", icon: ShieldCheck },
  { label: "Activity", href: "/activity", icon: Activity },
];

interface Props {
  orgSlug: string;
}

function NavLinks({
  orgSlug,
  collapsed,
  onNavigate,
}: {
  orgSlug: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
          const to = `/dashboard/${orgSlug}${href}`;
          const active = exact ? pathname === to : pathname.startsWith(to);
          return (
            <Link
              key={label}
              href={to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? label : undefined}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-border space-y-0.5">
        <Link
          href={`/dashboard/${orgSlug}/settings`}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={16} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </>
  );
}

export function DashboardSidebar({ orgSlug }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Mobile hamburger button (visible only on sm and below) ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-card border-r border-border transform transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <Logo className="text-foreground" />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-muted-foreground hover:bg-secondary transition-colors"
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>
        <NavLinks
          orgSlug={orgSlug}
          collapsed={false}
          onNavigate={() => setMobileOpen(false)}
        />
      </div>

      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-full bg-card border-r border-border transition-all duration-200",
          collapsed ? "w-16" : "w-56",
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center justify-center border-b border-border",
            collapsed ? "p-3" : "py-5 px-3",
          )}
        >
          {collapsed ? (
            <Logo iconOnly className="text-foreground" />
          ) : (
            <Logo className="text-foreground" />
          )}
        </div>

        <NavLinks orgSlug={orgSlug} collapsed={collapsed} />

        {/* Collapse toggle */}
        <div className="px-2 pb-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-muted-foreground hover:bg-secondary transition-colors",
              collapsed && "justify-center px-2",
            )}
          >
            {collapsed ? (
              <ChevronRight size={16} />
            ) : (
              <>
                <ChevronLeft size={16} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
