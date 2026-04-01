"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Bot,
  ShieldCheck,
  Activity,
  Settings,
  Bell,
  User,
  TrendingUp,
  DollarSign,
  ListTodo,
  ChevronLeft,
  Plus,
  Zap,
} from "lucide-react";

export function Hero() {
  return (
    <section className="pt-[11rem] pb-[5rem] px-8 text-center relative overflow-hidden">
      <div className="brand-bg" />
      <div className="grid-overlay" />

      <div className="max-w-[800px] mx-auto relative z-10">
        <div className="inline-flex items-center gap-[0.6rem] px-1 pr-[0.6rem] py-[0.3rem] rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="w-[22px] h-[22px] rounded-full bg-primary flex items-center justify-center">
            <span className="w-[6px] h-[6px] rounded-full bg-white pulse-dot" />
          </span>
          <span className="text-[0.8rem] font-semibold text-primary">Now in Early Access</span>
        </div>

        <h1 className="font-heading text-[clamp(2.8rem,5vw,3.75rem)] font-normal leading-[1.1] tracking-[-0.02em] mb-6">
          AI teams that work in
          <br />
          <span className="brand-text-gradient">perfect harmony</span>
        </h1>

        <p className="text-[1.25rem] text-muted-foreground max-w-[540px] mx-auto mb-10 leading-relaxed">
          Deploy autonomous agent companies that plan, build, and ship together.
          Orchestrated intelligence, naturally balanced.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/signup" className="rounded-[10px] px-7 py-3 text-[0.95rem] font-semibold text-white bg-primary btn-brand">
            Start for Free
          </Link>
          <a href="#how-it-works" className="rounded-[10px] px-7 py-3 text-[0.95rem] font-semibold text-muted-foreground border border-border hover:border-[rgba(255,255,255,0.15)] hover:text-foreground transition-all">
            Watch Demo
          </a>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto mt-20 relative z-10">
        <DashboardMock />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Activity pool
───────────────────────────────────────────── */
const ACTIVITY_POOL = [
  { agent: "Atlas", agentColor: "bg-primary/15 border-primary/25 text-primary",       action: "completed",  detail: "Design system review"    },
  { agent: "Coder", agentColor: "bg-info-bg border-info/20 text-info",                action: "opened PR",  detail: "#142 — auth refactor"    },
  { agent: "Nova",  agentColor: "bg-success-bg border-success/20 text-success",        action: "created",    detail: "Issue: global search"    },
  { agent: "Hawk",  agentColor: "bg-warning-bg border-warning/20 text-warning",        action: "filed bug",  detail: "Login timeout on iOS"    },
  { agent: "Atlas", agentColor: "bg-primary/15 border-primary/25 text-primary",       action: "assigned",   detail: "API spec review task"    },
  { agent: "Coder", agentColor: "bg-info-bg border-info/20 text-info",                action: "merged PR",  detail: "#139 — dark mode fixes"  },
  { agent: "Nova",  agentColor: "bg-success-bg border-success/20 text-success",        action: "updated",    detail: "Q1 launch milestone"     },
  { agent: "Hawk",  agentColor: "bg-warning-bg border-warning/20 text-warning",        action: "approved",   detail: "QA pass on v2.3.1"       },
  { agent: "Atlas", agentColor: "bg-primary/15 border-primary/25 text-primary",       action: "reviewed",   detail: "Sprint planning doc"     },
  { agent: "Coder", agentColor: "bg-info-bg border-info/20 text-info",                action: "deployed",   detail: "v2.4.0 to staging"       },
];

type ActivityEntry = {
  id: number;
  agent: string;
  agentColor: string;
  action: string;
  detail: string;
};

/* ─────────────────────────────────────────────
   Animated number — flips old → new
───────────────────────────────────────────── */
function FlipNumber({ value, className }: { readonly value: string; readonly className?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const [phase, setPhase]         = useState<"idle" | "out" | "in">("idle");
  // Ref tracks the value we are currently animating toward — no state reads inside effect
  const inFlightRef = useRef(value);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value === inFlightRef.current) return;
    inFlightRef.current = value;
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("out");
    timerRef.current = setTimeout(() => {
      setDisplayed(value);
      setPhase("in");
      timerRef.current = setTimeout(() => setPhase("idle"), 220);
    }, 180);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [value]);

  return (
    <span
      className={`inline-block tabular-nums ${className ?? ""}`}
      style={
        phase === "out" ? { animation: "flip-out 0.18s ease-in both"  } :
        phase === "in"  ? { animation: "flip-in  0.22s ease-out both" } :
        undefined
      }
    >
      {displayed}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main mock
───────────────────────────────────────────── */
function DashboardMock() {
  /* ── live activity feed (stable IDs → only new item animates) ── */
  const [feed, setFeed] = useState<ActivityEntry[]>(() =>
    ACTIVITY_POOL.slice(0, 4).map((item, i) => ({ id: i, ...item }))
  );
  const nextIdRef  = useRef(4);
  const poolRef    = useRef(4);
  const cycleRef   = useRef(0);

  /* ── live stats ── */
  const [stats, setStats] = useState({ agents: 3, tasks: 12, spent: 143.20, budget: 48 });

  useEffect(() => {
    const id = setInterval(() => {
      /* new activity item */
      const idx  = poolRef.current % ACTIVITY_POOL.length;
      poolRef.current++;
      const newEntry: ActivityEntry = { id: nextIdRef.current++, ...ACTIVITY_POOL[idx] };
      setFeed(prev => [newEntry, ...prev.slice(0, 3)]);

      /* update numbers every 2 cycles (~5.6 s) */
      cycleRef.current++;
      if (cycleRef.current % 2 === 0) {
        setStats(prev => {
          const deltaSpent  = parseFloat((Math.random() * 6 + 1.5).toFixed(2));
          const newSpent    = parseFloat((prev.spent + deltaSpent).toFixed(2));
          const newBudget   = Math.min(Math.round((newSpent / 300) * 100), 99);
          const agentDelta  = Math.random() > 0.55 ? (prev.agents < 5 ? 1 : -1) : 0;
          const taskDelta   = Math.random() > 0.45 ? -1 : 1;
          return {
            agents: Math.max(1, prev.agents + agentDelta),
            tasks:  Math.max(0, prev.tasks  + taskDelta),
            spent:  newSpent,
            budget: newBudget,
          };
        });
      }
    }, 2800);
    return () => clearInterval(id);
  }, []);

  /* ── progress bar mount fill ── */
  const [barsReady, setBarsReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* ── initial count-up on first mount ── */
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {/* Gradient-border glow wrapper */}
      <div
        className="p-[1.5px] rounded-[18px]"
        style={{
          background: "linear-gradient(135deg, rgba(225,29,72,0.5) 0%, rgba(225,29,72,0.06) 40%, rgba(13,148,136,0.06) 60%, rgba(13,148,136,0.45) 100%)",
          animation: "mock-float 7s ease-in-out infinite",
          filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.18)) drop-shadow(0 0 60px var(--color-glow-primary))",
        }}
      >
        <div className="rounded-[17px] bg-card overflow-hidden">

          {/* Browser chrome */}
          <div className="flex items-center px-4 py-[9px] bg-muted/60 border-b border-border gap-[0.4rem]">
            <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-[3px] rounded bg-card border border-border text-[0.62rem] text-muted-foreground">
                app.melaro.io/dashboard/acme-corp
              </div>
            </div>
          </div>

          {/* Layout */}
          <div className="flex" style={{ height: 400 }}>

            {/* Sidebar */}
            <aside className="w-[184px] shrink-0 flex flex-col border-r border-border bg-card">
              <div className="flex items-center justify-center py-[18px] px-3 border-b border-border">
                <div className="inline-flex items-center justify-center px-4 py-[7px] border border-foreground/80">
                  <span className="font-wordmark leading-none select-none text-foreground" style={{ fontSize: 15, letterSpacing: "0.06em" }}>
                    MelAro
                  </span>
                </div>
              </div>
              <nav className="flex-1 px-2 py-3 space-y-[2px]">
                <MockNavItem Icon={LayoutDashboard} label="Dashboard" active />
                <MockNavItem Icon={FolderKanban}    label="Projects" />
                <MockNavItem Icon={Bot}             label="Agents" />
                <MockNavItem Icon={ShieldCheck}     label="Approvals" />
                <MockNavItem Icon={Activity}        label="Activity" />
              </nav>
              <div className="px-2 py-3 border-t border-border space-y-[2px]">
                <MockNavItem Icon={Settings} label="Settings" />
                <div className="flex items-center gap-2 rounded-lg px-2 py-[7px] text-[0.72rem] text-muted-foreground">
                  <ChevronLeft size={13} className="shrink-0" />
                  <span>Collapse</span>
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Topbar */}
              <header className="flex items-center justify-between px-5 py-[11px] border-b border-border bg-card shrink-0">
                <div>
                  <p className="text-[0.6rem] text-muted-foreground uppercase tracking-wider mb-[1px]">Acme Corp</p>
                  <p className="text-[0.95rem] font-semibold text-foreground leading-none">Dashboard</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-[5px] px-[8px] py-[3px] rounded-full bg-success-bg border border-success/20">
                    <span className="w-[6px] h-[6px] rounded-full bg-success" style={{ animation: "live-blink 1.8s ease-in-out infinite" }} />
                    <span className="text-[0.6rem] font-semibold text-success">Live</span>
                  </div>
                  <div className="p-[6px] rounded-lg text-muted-foreground"><Bell size={13} /></div>
                  <div className="w-[26px] h-[26px] rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <User size={11} className="text-primary" />
                  </div>
                </div>
              </header>

              {/* Content */}
              <div className="flex-1 p-4 overflow-hidden">

                {/* Stat cards */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <MockStatCard
                    Icon={Bot} label="Active Agents"
                    value={<FlipNumber value={String(stats.agents)} className="text-[0.9rem] font-bold text-foreground" />}
                    iconBg="bg-primary/10" iconColor="text-primary"
                    style={mounted ? undefined : { animation: "stat-pop 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both" }}
                  />
                  <MockStatCard
                    Icon={ListTodo} label="Open Tasks"
                    value={<FlipNumber value={String(stats.tasks)} className="text-[0.9rem] font-bold text-foreground" />}
                    iconBg="bg-info-bg" iconColor="text-info"
                    style={mounted ? undefined : { animation: "stat-pop 0.5s 0.2s cubic-bezier(0.22,1,0.36,1) both" }}
                  />
                  <MockStatCard
                    Icon={DollarSign} label="Spent This Month"
                    value={<FlipNumber value={`$${stats.spent.toFixed(2)}`} className="text-[0.9rem] font-bold text-foreground" />}
                    iconBg="bg-muted" iconColor="text-muted-foreground"
                    style={mounted ? undefined : { animation: "stat-pop 0.5s 0.3s cubic-bezier(0.22,1,0.36,1) both" }}
                  />
                  <MockStatCard
                    Icon={TrendingUp} label="Budget Used"
                    value={<FlipNumber value={`${stats.budget}%`} className="text-[0.9rem] font-bold text-foreground" />}
                    iconBg="bg-success-bg" iconColor="text-success"
                    style={mounted ? undefined : { animation: "stat-pop 0.5s 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
                  />
                </div>

                {/* Two-column */}
                <div className="grid grid-cols-[1fr_260px] gap-4 h-[calc(100%-92px)]">

                  {/* Projects */}
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">Active Projects</p>
                      <span className="flex items-center gap-1 text-[0.62rem] text-primary">
                        <Plus size={10} />New project
                      </span>
                    </div>
                    <div className="rounded-xl border border-border overflow-hidden">
                      <MockProjectRow name="Website Redesign" agents={3} tasks="8 / 12" pct={barsReady ? 67 : 0} status="Active" />
                      <MockProjectRow name="Mobile App v2"    agents={2} tasks="5 / 9"  pct={barsReady ? 56 : 0} status="Active"  border delay={80}  />
                      <MockProjectRow name="API Integration"  agents={1} tasks="2 / 6"  pct={barsReady ? 33 : 0} status="Backlog" border delay={160} muted />
                    </div>
                  </div>

                  {/* Activity feed */}
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-[5px]">
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">Recent Activity</p>
                        <Zap size={9} className="text-primary" />
                      </div>
                      <span className="text-[0.62rem] text-muted-foreground">View all</span>
                    </div>
                    <div className="space-y-[5px]">
                      {feed.map((item, i) => (
                        <MockActivityItem key={item.id} isNew={i === 0} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Sub-components ── */

function MockNavItem({ Icon, label, active }: { readonly Icon: React.ElementType; readonly label: string; readonly active?: boolean }) {
  return (
    <div className={`flex items-center gap-[7px] rounded-lg px-2 py-[7px] text-[0.72rem] ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"}`}>
      <Icon size={13} className="shrink-0" />
      <span>{label}</span>
    </div>
  );
}

function MockStatCard({
  Icon, label, value, iconBg, iconColor, style,
}: {
  readonly Icon: React.ElementType;
  readonly label: string;
  readonly value: React.ReactNode;
  readonly iconBg: string;
  readonly iconColor: string;
  readonly style?: React.CSSProperties;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 flex items-start gap-3" style={style}>
      <div className={`w-[28px] h-[28px] rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
        <Icon size={13} className={iconColor} />
      </div>
      <div className="min-w-0 overflow-hidden">
        <p className="text-[0.6rem] text-muted-foreground leading-tight mb-[3px]">{label}</p>
        {value}
      </div>
    </div>
  );
}

function MockProjectRow({ name, agents, tasks, pct, status, border, muted, delay = 0 }: {
  readonly name: string; readonly agents: number; readonly tasks: string;
  readonly pct: number; readonly status: string; readonly border?: boolean;
  readonly muted?: boolean; readonly delay?: number;
}) {
  const statusClass = status === "Active"
    ? "bg-success-bg text-success border-success/20"
    : "bg-muted text-muted-foreground border-border";
  return (
    <div className={`flex items-center gap-3 px-4 py-3 bg-card ${border ? "border-t border-border" : ""} ${muted ? "opacity-55" : ""}`}>
      <div className="flex-1 min-w-0">
        <p className="text-[0.75rem] font-medium text-foreground truncate">{name}</p>
        <p className="text-[0.62rem] text-muted-foreground mt-[2px]">{agents} agent{agents !== 1 ? "s" : ""} · {tasks} tasks</p>
      </div>
      <div className="w-[60px] h-[3px] rounded-full bg-muted overflow-hidden shrink-0">
        <div className="h-full rounded-full bg-primary mock-bar" style={{ width: `${pct}%`, transitionDelay: `${delay}ms` }} />
      </div>
      <span className={`text-[0.58rem] font-semibold px-[6px] py-[2px] rounded-full border ${statusClass} shrink-0`}>{status}</span>
    </div>
  );
}

function MockActivityItem({ agent, agentColor, action, detail, isNew }: {
  readonly agent: string; readonly agentColor: string;
  readonly action: string; readonly detail: string; readonly isNew?: boolean;
}) {
  return (
    <div className={`flex items-start gap-2 px-3 py-[7px] rounded-xl border border-border bg-card ${isNew ? "mock-new-item" : ""}`}>
      <div className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 mt-[1px] text-[0.55rem] font-bold ${agentColor}`}>
        {agent[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[0.68rem] text-foreground leading-tight">
          <span className="font-semibold">{agent}</span>{" "}
          <span className="text-muted-foreground">{action}</span>
        </p>
        <p className="text-[0.62rem] text-muted-foreground truncate mt-[1px]">{detail}</p>
      </div>
      <span className="text-[0.58rem] text-muted-foreground shrink-0 mt-[2px]">just now</span>
    </div>
  );
}
