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

describe("superclip.listApprovals", () => {
  it("calls approvals endpoint without filter", async () => {
    mockOk([]);
    await superclip.listApprovals(COOKIE, "c1");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/companies/c1/approvals"),
      expect.any(Object),
    );
  });

  it("appends status query param when provided", async () => {
    mockOk([]);
    await superclip.listApprovals(COOKIE, "c1", "pending");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("?status=pending"),
      expect.any(Object),
    );
  });
});

describe("superclip.approveApproval", () => {
  it("sends POST to approve endpoint with decision note", async () => {
    const approval = { id: "ap1", status: "approved" };
    mockOk(approval);

    const result = await superclip.approveApproval(COOKIE, "ap1", "Looks good");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/approvals/ap1/approve"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ decisionNote: "Looks good" }),
      }),
    );
    expect(result).toEqual(approval);
  });

  it("sends POST to approve endpoint without note", async () => {
    mockOk({ id: "ap2", status: "approved" });
    await superclip.approveApproval(COOKIE, "ap2");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/approvals/ap2/approve"),
      expect.objectContaining({ method: "POST" }),
    );
  });
});

describe("superclip.rejectApproval", () => {
  it("sends POST to reject endpoint with decision note", async () => {
    const approval = { id: "ap3", status: "rejected" };
    mockOk(approval);

    const result = await superclip.rejectApproval(COOKIE, "ap3", "Not safe");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/approvals/ap3/reject"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ decisionNote: "Not safe" }),
      }),
    );
    expect(result).toEqual(approval);
  });

  it("sends POST to reject endpoint without note", async () => {
    mockOk({ id: "ap4", status: "rejected" });
    await superclip.rejectApproval(COOKIE, "ap4");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/approvals/ap4/reject"),
      expect.objectContaining({ method: "POST" }),
    );
  });
});

describe("superclip.listIssues", () => {
  it("calls project-scoped issues endpoint", async () => {
    mockOk([]);
    await superclip.listIssues(COOKIE, "proj-1");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/projects/proj-1/issues"),
      expect.any(Object),
    );
  });
});

describe("superclip.getProject", () => {
  it("calls single-project endpoint", async () => {
    mockOk({ id: "proj-1" });
    const result = await superclip.getProject(COOKIE, "proj-1");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/projects/proj-1"),
      expect.any(Object),
    );
    expect((result as { id: string }).id).toBe("proj-1");
  });
});

describe("superclip.listTemplates", () => {
  it("calls the templates endpoint", async () => {
    mockOk([]);
    await superclip.listTemplates(COOKIE);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/templates/companies"),
      expect.any(Object),
    );
  });
});

describe("sc error handling", () => {
  it("includes error status and body in the thrown message", async () => {
    mockError(403, "Forbidden");
    await expect(superclip.listCompanies(COOKIE)).rejects.toThrow("Superclip 403: Forbidden");
  });

  it("throws with empty message when res.text() rejects", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => {
        throw new Error("stream error");
      },
    } as unknown as Response);
    await expect(superclip.listCompanies(COOKIE)).rejects.toThrow("Superclip 500:");
  });
});
