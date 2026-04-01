import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import type { ScDashboard } from "@/lib/superclip";

const dashboard: ScDashboard = {
  activeAgents: 5,
  runningIssues: 12,
  dailySpendCents: 1420,
  budgetUtilizationPct: 71,
  recentActivity: [],
};

describe("StatsCards", () => {
  it("renders all four stat labels", () => {
    render(<StatsCards data={dashboard} />);
    expect(screen.getByText("Active Agents")).toBeInTheDocument();
    expect(screen.getByText("Open Tasks")).toBeInTheDocument();
    expect(screen.getByText("Spent Today")).toBeInTheDocument();
    expect(screen.getByText("Budget Used")).toBeInTheDocument();
  });

  it("displays agent count", () => {
    render(<StatsCards data={dashboard} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("formats daily spend in dollars", () => {
    render(<StatsCards data={dashboard} />);
    expect(screen.getByText("$14.20")).toBeInTheDocument();
  });

  it("shows budget as percentage", () => {
    render(<StatsCards data={dashboard} />);
    expect(screen.getByText("71%")).toBeInTheDocument();
  });

  it("shows running issues count", () => {
    render(<StatsCards data={dashboard} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });
});
