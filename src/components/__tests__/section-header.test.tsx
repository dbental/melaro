import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "../section-header";

describe("SectionHeader", () => {
  it("renders label, title, and description", () => {
    render(
      <SectionHeader
        label="Features"
        title="Test Title"
        description="Test description text"
      />
    );
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description text")).toBeInTheDocument();
  });

  it("renders without description", () => {
    render(<SectionHeader label="Pricing" title="Plans" />);
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Plans")).toBeInTheDocument();
  });
});
