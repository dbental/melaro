"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Step 1: Pick a template ──────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "saas-startup",
    name: "SaaS Startup",
    emoji: "🚀",
    description: "CEO, CTO, PM, 2 Engineers, Designer, QA — ready to ship product.",
    agents: 7,
    tags: ["Product", "Engineering", "Design"],
  },
  {
    id: "marketing-agency",
    name: "Marketing Agency",
    emoji: "📣",
    description: "CMO, Strategist, Content Writer, SEO Analyst, Social Media Manager.",
    agents: 5,
    tags: ["Content", "SEO", "Growth"],
  },
  {
    id: "dev-studio",
    name: "Dev Studio",
    emoji: "⚙️",
    description: "Lead Engineer, Backend, Frontend, DevOps, QA — pure execution.",
    agents: 5,
    tags: ["Engineering", "DevOps", "QA"],
  },
  {
    id: "custom",
    name: "Custom Team",
    emoji: "✨",
    description: "Start with a blank slate and configure each agent yourself.",
    agents: 0,
    tags: ["Flexible"],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface WizardState {
  templateId: string;
  companyName: string;
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepTemplatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-heading mb-2">Choose your team template</h2>
        <p className="text-muted-foreground text-sm">
          Select a pre-built team or start from scratch. You can customize agents later.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "text-left rounded-xl border p-5 transition-all",
              value === t.id
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/30",
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{t.emoji}</span>
              {value === t.id && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </div>
              )}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{t.name}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t.description}</p>
            <div className="flex gap-1.5 flex-wrap">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            {t.agents > 0 && (
              <p className="text-xs text-muted-foreground mt-2">{t.agents} agents</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepConfigure({
  companyName,
  templateId,
  onChange,
}: {
  companyName: string;
  templateId: string;
  onChange: (name: string) => void;
}) {
  const template = TEMPLATES.find((t) => t.id === templateId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading mb-2">Name your company</h2>
        <p className="text-muted-foreground text-sm">
          This is how your AI team will refer to the company they work for.
        </p>
      </div>

      <div>
        <label htmlFor="company-name" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Company name
        </label>
        <input
          id="company-name"
          type="text"
          value={companyName}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Acme Inc."
          className="w-full rounded-[10px] border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          autoFocus
        />
      </div>

      {template && template.agents > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{template.emoji}</span>
            <div>
              <p className="text-sm font-medium text-foreground">{template.name}</p>
              <p className="text-xs text-muted-foreground">{template.agents} agents will be created</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{template.description}</p>
        </div>
      )}
    </div>
  );
}

function StepLaunch({
  companyName,
  status,
  error,
}: {
  companyName: string;
  status: "launching" | "done" | "error";
  error?: string;
}) {
  return (
    <div className="text-center space-y-6 py-8">
      {status === "launching" && (
        <>
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-ping [animation-delay:0.2s]" />
            <div className="absolute inset-4 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-heading mb-2">Launching {companyName}</h2>
            <p className="text-muted-foreground text-sm">
              Setting up your AI team. This takes just a moment...
            </p>
          </div>
          <div className="space-y-2 max-w-xs mx-auto text-left">
            {["Creating company", "Deploying agents", "Configuring workflows"].map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div
                  className="w-4 h-4 rounded-full border border-primary/40 animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                {step}
              </div>
            ))}
          </div>
        </>
      )}

      {status === "done" && (
        <>
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
            <Check size={28} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-heading mb-2">Your team is ready!</h2>
            <p className="text-muted-foreground text-sm">
              {companyName} is live. Redirecting to your dashboard...
            </p>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <div className="mx-auto w-16 h-16 rounded-full bg-warm/10 border border-warm/30 flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <div>
            <h2 className="text-2xl font-heading mb-2">Something went wrong</h2>
            <p className="text-sm text-warm-deep bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-lg px-4 py-3 max-w-sm mx-auto">
              {error ?? "Failed to create your team. Please try again."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 rounded-full flex-1 transition-all",
            i < current ? "bg-primary" : i === current ? "bg-primary/60" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    templateId: "saas-startup",
    companyName: "",
  });
  const [launchStatus, setLaunchStatus] = useState<"launching" | "done" | "error">("launching");
  const [launchError, setLaunchError] = useState("");

  const TOTAL_STEPS = 3;

  async function launch() {
    setStep(2);
    setLaunchStatus("launching");

    try {
      // 1. Create company
      const companyRes = await fetch("/api/sc/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: state.companyName }),
        credentials: "include",
      });

      if (!companyRes.ok) throw new Error("Failed to create company");
      const company = await companyRes.json();

      // 2. Deploy template (if not custom)
      if (state.templateId !== "custom") {
        await fetch(
          `/api/sc/companies/${company.id}/templates/${state.templateId}/deploy`,
          { method: "POST", credentials: "include" },
        ).catch(() => {
          // Non-fatal: company exists even if template deploy fails
        });
      }

      setLaunchStatus("done");

      // Redirect to dashboard after brief success display
      setTimeout(() => {
        router.push(`/dashboard/${company.slug ?? company.id}`);
      }, 1500);
    } catch (err) {
      setLaunchStatus("error");
      setLaunchError(err instanceof Error ? err.message : "Unexpected error");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-2xl">
        {step < 2 && <StepIndicator current={step} total={TOTAL_STEPS} />}

        {step === 0 && (
          <>
            <StepTemplatePicker
              value={state.templateId}
              onChange={(id) => setState((s) => ({ ...s, templateId: id }))}
            />
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:opacity-90 transition-opacity"
              >
                Continue
                <ChevronRight size={14} />
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <StepConfigure
              companyName={state.companyName}
              templateId={state.templateId}
              onChange={(name) => setState((s) => ({ ...s, companyName: name }))}
            />
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(0)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back
              </button>
              <button
                onClick={launch}
                disabled={!state.companyName.trim()}
                className="flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-primary disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Launch team
                <ChevronRight size={14} />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <StepLaunch
              companyName={state.companyName}
              status={launchStatus}
              error={launchError}
            />
            {launchStatus === "error" && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={launch}
                  className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  Try again
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
