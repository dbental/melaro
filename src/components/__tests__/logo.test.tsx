import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Logo } from "../logo";

describe("Logo", () => {
  afterEach(cleanup);

  it("renders the MelAro wordmark text", () => {
    render(<Logo />);
    expect(screen.getByText("MelAro")).toBeInTheDocument();
  });

  it("renders as a link to /", () => {
    render(<Logo />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the single-letter M when iconOnly is true", () => {
    render(<Logo iconOnly />);
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("does not render the full wordmark when iconOnly is true", () => {
    render(<Logo iconOnly />);
    expect(screen.queryByText("MelAro")).not.toBeInTheDocument();
  });

  it("applies the className prop to the link element", () => {
    render(<Logo className="text-white" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-white");
  });

  it("iconOnly link also navigates to /", () => {
    render(<Logo iconOnly />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
