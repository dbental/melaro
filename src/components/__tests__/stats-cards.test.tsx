import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import type { ScDashboard } from "@/lib/superclip";

function makeDashboard(overrides: Partial<ScDashboard> = {}): ScDashboard {
  return {
    companyId: "test-co",
    agents: { active: 5, running: 2, paused: 1, error: 0 },
    tasks: { open: 12, inProgress: 3, blocked: 1, done: 40 },
    costs: { monthSpendCents: 1420, monthBudgetCents: 20000, monthUtilizationPercent: 71 },
    pendingApprovals: 0,
    ...overrides,
  };
}

describe("StatsCards", () => {
  afterEach(cleanup);

  it("renders all four base stat labels", () => {
    render(<StatsCards data={makeDashboard()} />);
    expect(screen.getByText("Active Agents")).toBeInTheDocument();
    expect(screen.getByText("Open Tasks")).toBeInTheDocument();
    expect(screen.getByText("Spent This Month")).toBeInTheDocument();
    expect(screen.getByText("Budget Used")).toBeInTheDocument();
  });

  it("displays the active agent count", () => {
    render(<StatsCards data={makeDashboard()} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays the open task count", () => {
    render(<StatsCards data={makeDashboard()} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("formats monthly spend in dollars from cents", () => {
    render(<StatsCards data={makeDashboard()} />);
    expect(screen.getByText("$14.20")).toBeInTheDocument();
  });

  it("shows budget utilisation as a percentage", () => {
    render(<StatsCards data={makeDashboard()} />);
    expect(screen.getByText("71%")).toBeInTheDocument();
  });

  it("shows pending approvals card when count > 0", () => {
    render(<StatsCards data={makeDashboard({ pendingApprovals: 3 })} />);
    expect(screen.getByText("Pending Approvals")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("hides pending approvals card when count is 0", () => {
    render(<StatsCards data={makeDashboard({ pendingApprovals: 0 })} />);
    expect(screen.queryByText("Pending Approvals")).not.toBeInTheDocument();
  });

  it("rounds budget percentage to nearest integer", () => {
    render(<StatsCards data={makeDashboard({ costs: { monthSpendCents: 0, monthBudgetCents: 10000, monthUtilizationPercent: 67.8 } })} />);
    expect(screen.getByText("68%")).toBeInTheDocument();
  });

  it("applies danger colour classes when budget utilisation exceeds 80%", () => {
    const { container } = render(
      <StatsCards data={makeDashboard({ costs: { monthSpendCents: 9000, monthBudgetCents: 10000, monthUtilizationPercent: 90 } })} />,
    );
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(container.querySelector(".bg-danger-bg")).toBeInTheDocument();
  });

  it("applies success colour classes when budget utilisation is at or below 80%", () => {
    const { container } = render(
      <StatsCards data={makeDashboard({ costs: { monthSpendCents: 8000, monthBudgetCents: 10000, monthUtilizationPercent: 80 } })} />,
    );
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(container.querySelector(".bg-success-bg")).toBeInTheDocument();
  });
});
