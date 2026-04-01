import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import type { ScActivity } from "@/lib/superclip";

const items: ScActivity[] = [
  {
    id: "1",
    type: "issue.created",
    agentId: "a1",
    agentName: "Emma",
    agentEmoji: "👩‍💻",
    description: "created issue PROJ-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "issue.done",
    agentId: "a2",
    agentName: "Alex",
    agentEmoji: null,
    description: "completed the landing page task",
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
  },
];

describe("ActivityTimeline", () => {
  it("renders all activity items", () => {
    render(<ActivityTimeline items={items} />);
    expect(screen.getByText(/created issue PROJ-1/)).toBeInTheDocument();
    expect(screen.getByText(/completed the landing page task/)).toBeInTheDocument();
  });

  it("shows agent names", () => {
    render(<ActivityTimeline items={items} />);
    expect(screen.getByText("Emma")).toBeInTheDocument();
    expect(screen.getByText("Alex")).toBeInTheDocument();
  });

  it("shows empty state when no items", () => {
    render(<ActivityTimeline items={[]} />);
    expect(screen.getByText("No activity yet")).toBeInTheDocument();
  });

  it("shows fallback emoji when agentEmoji is null", () => {
    render(<ActivityTimeline items={[items[1]]} />);
    expect(screen.getByText("⚡")).toBeInTheDocument();
  });

  it("shows agent emoji when available", () => {
    render(<ActivityTimeline items={[items[0]]} />);
    expect(screen.getByText("👩‍💻")).toBeInTheDocument();
  });
});
