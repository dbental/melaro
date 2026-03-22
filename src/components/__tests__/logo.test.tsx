import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Logo } from "../logo";

describe("Logo", () => {
  afterEach(cleanup);

  it("renders the logo image and wordmark", () => {
    render(<Logo />);
    expect(screen.getByAltText("Melaro")).toBeInTheDocument();
    expect(screen.getByText("melaro")).toBeInTheDocument();
  });

  it("renders icon only when iconOnly is true", () => {
    const { container } = render(<Logo iconOnly />);
    expect(container.querySelector("img")).toBeInTheDocument();
    expect(screen.queryByText("melaro")).not.toBeInTheDocument();
  });
});
