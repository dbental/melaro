import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import type { ScActivity } from "@/lib/superclip";

function makeItem(overrides: Partial<ScActivity> = {}): ScActivity {
  return {
    id: "1",
    companyId: "c1",
    actorType: "agent",
    actorId: "a1",
    action: "issue.created",
    entityType: "issue",
    entityId: "i1",
    agentId: "a1",
    runId: null,
    details: null,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("ActivityTimeline", () => {
  afterEach(cleanup);

  it("renders a human-readable label for known action types", () => {
    render(<ActivityTimeline items={[makeItem({ action: "issue.created" })]} />);
    expect(screen.getByText("Task created")).toBeInTheDocument();
  });

  it("falls back to formatted action string for unknown action types", () => {
    render(<ActivityTimeline items={[makeItem({ action: "custom.event" })]} />);
    expect(screen.getByText("custom event")).toBeInTheDocument();
  });

  it("shows the empty state when no items are passed", () => {
    render(<ActivityTimeline items={[]} />);
    expect(screen.getByText("No activity yet")).toBeInTheDocument();
  });

  it("shows agent icon ⚡ for actorType agent", () => {
    render(<ActivityTimeline items={[makeItem({ actorType: "agent" })]} />);
    expect(screen.getByText("⚡")).toBeInTheDocument();
  });

  it("shows user icon 👤 for actorType user", () => {
    render(<ActivityTimeline items={[makeItem({ actorType: "user" })]} />);
    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  it("shows system icon 🔧 for actorType system", () => {
    render(<ActivityTimeline items={[makeItem({ actorType: "system" })]} />);
    expect(screen.getByText("🔧")).toBeInTheDocument();
  });

  it("falls back to ⚡ for unknown actorType", () => {
    render(<ActivityTimeline items={[makeItem({ actorType: "unknown_type" })]} />);
    expect(screen.getByText("⚡")).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    const items = [
      makeItem({ id: "1", action: "issue.created" }),
      makeItem({ id: "2", action: "run.completed" }),
    ];
    render(<ActivityTimeline items={items} />);
    expect(screen.getByText("Task created")).toBeInTheDocument();
    expect(screen.getByText("Run completed")).toBeInTheDocument();
  });

  it("renders all known action labels correctly", () => {
    const knownActions: Array<[string, string]> = [
      ["agent.paused", "Agent paused"],
      ["agent.resumed", "Agent resumed"],
      ["issue.completed", "Completed a task"],
      ["project.created", "Project created"],
      ["run.failed", "Run failed"],
    ];
    for (const [action, label] of knownActions) {
      const { unmount } = render(<ActivityTimeline items={[makeItem({ id: action, action })]} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    }
  });
});
