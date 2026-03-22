import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-[11rem] pb-[5rem] px-8 text-center relative overflow-hidden">
      {/* Aurora gradient */}
      <div className="aurora-bg" />
      {/* Grid overlay */}
      <div className="grid-overlay" />

      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-[0.6rem] px-1 pr-[0.6rem] py-[0.3rem] rounded-full bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.15)] mb-8">
          <span className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-primary-deep to-accent-deep flex items-center justify-center">
            <span className="w-[6px] h-[6px] rounded-full bg-white pulse-dot" />
          </span>
          <span className="text-[0.8rem] font-semibold text-primary-bright">
            Now in Early Access
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-[clamp(3rem,6vw,4.8rem)] font-normal leading-[1.08] tracking-[-0.02em] mb-6">
          AI teams that work in
          <br />
          <span className="shimmer-text">perfect harmony</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[1.15rem] text-fg-muted max-w-[520px] mx-auto mb-10 leading-relaxed">
          Deploy autonomous agent companies that plan, build, and ship together.
          Orchestrated intelligence, naturally balanced.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/signup"
            className="rounded-[10px] px-[1.5rem] py-[0.65rem] text-[0.88rem] font-semibold text-white bg-gradient-to-br from-primary-deep to-accent-deep btn-glow"
          >
            Start for Free
          </Link>
          <a
            href="#how-it-works"
            className="rounded-[10px] px-[1.5rem] py-[0.65rem] text-[0.88rem] font-semibold text-fg-muted border border-card-border hover:border-[rgba(255,255,255,0.15)] hover:text-foreground transition-all"
          >
            Watch Demo
          </a>
        </div>
      </div>

      {/* Dashboard visual */}
      <div className="max-w-[1000px] mx-auto mt-20 relative z-10">
        <DashboardMock />
      </div>
    </section>
  );
}

function DashboardMock() {
  const agents = [
    { role: "CEO", name: "Atlas", title: "Chief Executive", tasks: "12/15", pct: 80, cost: "$42.30", status: "Active", color: "from-primary-deep to-primary", statusClass: "bg-[rgba(167,139,250,0.12)] text-primary-bright border-[rgba(167,139,250,0.2)]" },
    { role: "ENG", name: "Coder", title: "Lead Engineer", tasks: "8/10", pct: 80, cost: "$67.85", status: "Running", color: "from-accent-deep to-accent", statusClass: "bg-[rgba(240,171,252,0.1)] text-accent border-[rgba(240,171,252,0.18)]" },
    { role: "PM", name: "Nova", title: "Product Manager", tasks: "5/8", pct: 62, cost: "$23.10", status: "Active", color: "from-[#6366F1] to-[#818CF8]", statusClass: "bg-[rgba(167,139,250,0.12)] text-primary-bright border-[rgba(167,139,250,0.2)]" },
    { role: "QA", name: "Hawk", title: "Quality Assurance", tasks: "3/6", pct: 50, cost: "$11.40", status: "Idle", color: "from-[#E11D48] to-warm", statusClass: "bg-[rgba(161,161,170,0.08)] text-fg-dim border-[rgba(161,161,170,0.12)]" },
  ];

  return (
    <div className="bg-bg-elevated rounded-2xl border border-card-border shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.6),0_0_80px_var(--color-glow-primary)] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center px-5 py-3 bg-[rgba(255,255,255,0.02)] border-b border-card-border gap-[0.4rem]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        <div className="flex ml-6 gap-0">
          <span className="px-4 py-[0.35rem] text-[0.72rem] text-fg-muted font-medium bg-bg-elevated border border-card-border border-b-bg-elevated rounded-t-md">Agents</span>
          <span className="px-4 py-[0.35rem] text-[0.72rem] text-fg-dim font-medium">Issues</span>
          <span className="px-4 py-[0.35rem] text-[0.72rem] text-fg-dim font-medium">Analytics</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-[360px]">
        {/* Sidebar */}
        <div className="hidden md:block border-r border-card-border p-5">
          <p className="text-[0.68rem] font-bold text-fg-dim uppercase tracking-[0.1em] mb-[0.6rem]">Workspace</p>
          <SidebarItem label="Website Redesign" active />
          <SidebarItem label="Mobile App" />
          <SidebarItem label="API v2" />
          <p className="text-[0.68rem] font-bold text-fg-dim uppercase tracking-[0.1em] mb-[0.6rem] mt-6">Navigation</p>
          <SidebarItem label="Dashboard" />
          <SidebarItem label="Agent Team" active />
          <SidebarItem label="Issues" />
          <SidebarItem label="Goals" />
          <SidebarItem label="Cost Tracker" />
        </div>

        {/* Main */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[0.95rem] font-bold">Agent Team</h3>
            <span className="text-[0.7rem] font-semibold px-[0.6rem] py-[0.2rem] rounded-full bg-[rgba(124,58,237,0.1)] text-primary-bright border border-[rgba(124,58,237,0.2)]">
              4 agents active
            </span>
          </div>

          <div className="flex flex-col gap-[0.6rem]">
            {agents.map((a) => (
              <div key={a.name} className="flex items-center gap-3 px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-card-border rounded-[10px] hover:bg-[rgba(255,255,255,0.04)] hover:border-card-border-hover transition-all">
                <span className={`w-[34px] h-[34px] rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center text-[0.6rem] font-bold text-white shrink-0`}>{a.role}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.82rem] font-semibold">{a.name}</p>
                  <p className="text-[0.7rem] text-fg-dim">{a.title}</p>
                </div>
                <span className="text-[0.72rem] text-fg-dim tabular-nums hidden sm:block">{a.tasks} tasks</span>
                <div className="w-[80px] h-1 rounded-full bg-[rgba(255,255,255,0.05)] hidden sm:block overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${a.color}`} style={{ width: `${a.pct}%` }} />
                </div>
                <span className="text-[0.72rem] font-semibold tabular-nums text-primary-bright hidden sm:block">{a.cost}</span>
                <span className={`text-[0.62rem] font-semibold px-2 py-[0.15rem] rounded-full border min-w-[56px] text-center ${a.statusClass}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, active }: { readonly label: string; readonly active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-[0.6rem] py-[0.45rem] rounded-md mb-[0.15rem] text-[0.78rem] ${active ? "bg-[rgba(124,58,237,0.12)] text-primary-bright" : "text-fg-dim"}`}>
      <span className={`w-[14px] h-[14px] rounded-[3px] bg-current ${active ? "opacity-60" : "opacity-30"}`} />
      {label}
    </div>
  );
}
