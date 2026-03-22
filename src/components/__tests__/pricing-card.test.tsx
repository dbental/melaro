import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { PricingCard } from "../pricing-card";

const baseProps = {
  name: "Pro",
  price: "$49",
  period: "/mo",
  description: "For serious builders.",
  features: ["5 companies", "25 agents"],
  ctaLabel: "Get Started",
  ctaHref: "/signup",
};

describe("PricingCard", () => {
  afterEach(cleanup);

  it("renders plan details", () => {
    render(<PricingCard {...baseProps} />);
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("For serious builders.")).toBeInTheDocument();
    expect(screen.getByText("5 companies")).toBeInTheDocument();
    expect(screen.getByText("25 agents")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("shows 'Most Popular' badge when featured", () => {
    render(<PricingCard {...baseProps} featured />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("does not show badge when not featured", () => {
    render(<PricingCard {...baseProps} />);
    expect(screen.queryByText("Most Popular")).not.toBeInTheDocument();
  });
});
