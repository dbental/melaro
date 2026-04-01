import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { superclip } from "./superclip";

const COOKIE = "better-auth.session_token=test-token";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

function mockOk(data: unknown) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  } as Response);
}

function mockError(status: number, message: string) {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status,
    text: async () => message,
  } as Response);
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("superclip.listCompanies", () => {
  it("calls the correct URL and returns data", async () => {
    const companies = [{ id: "c1", name: "Acme", slug: "acme", createdAt: "" }];
    mockOk(companies);

    const result = await superclip.listCompanies(COOKIE);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/companies"),
      expect.objectContaining({
        headers: expect.objectContaining({ Cookie: COOKIE }),
      }),
    );
    expect(result).toEqual(companies);
  });

  it("throws on non-ok response", async () => {
    mockError(401, "Unauthorized");
    await expect(superclip.listCompanies(COOKIE)).rejects.toThrow("401");
  });
});

describe("superclip.createCompany", () => {
  it("sends POST with company name and returns created company", async () => {
    const created = { id: "c2", name: "Beta Corp", slug: "beta-corp", createdAt: "" };
    mockOk(created);

    const result = await superclip.createCompany(COOKIE, { name: "Beta Corp" });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/companies"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Beta Corp" }),
      }),
    );
    expect(result).toEqual(created);
  });
});

describe("superclip.listProjects", () => {
  it("calls company-scoped projects endpoint", async () => {
    mockOk([]);
    await superclip.listProjects(COOKIE, "company-123");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/companies/company-123/projects"),
      expect.any(Object),
    );
  });
});

describe("superclip.createProject", () => {
  it("sends project data and returns created project", async () => {
    const proj = {
      id: "p1",
      companyId: "c1",
      name: "Redesign",
      description: "Website redesign",
      status: "active" as const,
      color: "#7C3AED",
      issuePrefix: "RD",
      issueCounter: 0,
      leadAgentId: null,
      targetDate: null,
      createdAt: "",
      updatedAt: "",
    };
    mockOk(proj);

    const result = await superclip.createProject(COOKIE, "c1", {
      name: "Redesign",
      description: "Website redesign",
      color: "#7C3AED",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/companies/c1/projects"),
      expect.objectContaining({ method: "POST" }),
    );
    expect(result.name).toBe("Redesign");
  });
});

describe("superclip.listAgents", () => {
  it("calls agents endpoint for company", async () => {
    mockOk([]);
    await superclip.listAgents(COOKIE, "company-abc");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/companies/company-abc/agents"),
      expect.any(Object),
    );
  });
});

describe("superclip.getDashboard", () => {
  it("returns dashboard data", async () => {
    const dashboard = {
      activeAgents: 3,
      runningIssues: 7,
      dailySpendCents: 420,
      budgetUtilizationPct: 42,
      recentActivity: [],
    };
    mockOk(dashboard);

    const result = await superclip.getDashboard(COOKIE, "company-1");
    expect(result.activeAgents).toBe(3);
    expect(result.dailySpendCents).toBe(420);
  });
});

describe("superclip.getActivity", () => {
  it("includes limit in query string", async () => {
    mockOk([]);
    await superclip.getActivity(COOKIE, "company-1", 30);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("limit=30"),
      expect.any(Object),
    );
  });
});

describe("superclip.deployTemplate", () => {
  it("sends POST to deploy endpoint", async () => {
    mockOk({ success: true });
    const result = await superclip.deployTemplate(COOKIE, "c1", "saas-startup");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/companies/c1/templates/saas-startup/deploy"),
      expect.objectContaining({ method: "POST" }),
    );
    expect(result.success).toBe(true);
  });
});
