import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgentCard } from "@/components/agents/agent-card";
import type { ScAgent } from "@/lib/superclip";

const base: ScAgent = {
  id: "a1",
  companyId: "c1",
  name: "Emma",
  role: "engineer",
  emoji: "👩‍💻",
  status: "idle",
  currentTask: null,
  lastHeartbeat: null,
  createdAt: new Date().toISOString(),
};

describe("AgentCard", () => {
  it("renders agent name and role", () => {
    render(<AgentCard agent={base} />);
    expect(screen.getByText("Emma")).toBeInTheDocument();
    expect(screen.getByText("engineer")).toBeInTheDocument();
  });

  it("shows emoji", () => {
    render(<AgentCard agent={base} />);
    expect(screen.getByText("👩‍💻")).toBeInTheDocument();
  });

  it("shows 'No active task' when currentTask is null", () => {
    render(<AgentCard agent={base} />);
    expect(screen.getByText("No active task")).toBeInTheDocument();
  });

  it("shows current task text", () => {
    render(<AgentCard agent={{ ...base, currentTask: "Reviewing PR #42" }} />);
    expect(screen.getByText("Reviewing PR #42")).toBeInTheDocument();
  });

  it("shows Running status for running agents", () => {
    render(<AgentCard agent={{ ...base, status: "running" }} />);
    expect(screen.getByText("Running")).toBeInTheDocument();
  });

  it("shows Error status for errored agents", () => {
    render(<AgentCard agent={{ ...base, status: "error" }} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("shows fallback emoji when emoji is null", () => {
    render(<AgentCard agent={{ ...base, emoji: null }} />);
    expect(screen.getByText("🤖")).toBeInTheDocument();
  });
});
