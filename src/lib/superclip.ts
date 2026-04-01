/**
 * Server-side Superclip API client.
 * All methods require a `cookieHeader` (the raw Cookie string from the
 * incoming Next.js request) so that the better-auth session is forwarded
 * to Superclip and the request is properly authorized.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3200";

async function sc<T>(
  path: string,
  cookieHeader: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...(init?.headers as Record<string, string> | undefined),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Superclip ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScCompany {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface ScProject {
  id: string;
  companyId: string;
  name: string;
  description: string | null;
  status: "active" | "backlog" | "paused" | "archived";
  color: string | null;
  issuePrefix: string | null;
  issueCounter: number;
  leadAgentId: string | null;
  targetDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ScAgent {
  id: string;
  companyId: string;
  name: string;
  role: string;
  emoji: string | null;
  status: "idle" | "running" | "error" | "offline";
  currentTask: string | null;
  lastHeartbeat: string | null;
  createdAt: string;
}

export interface ScIssue {
  id: string;
  projectId: string;
  title: string;
  status: "open" | "in_progress" | "done" | "cancelled";
  priority: "low" | "medium" | "high" | "critical";
  assignedAgentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ScDashboard {
  companyId: string;
  agents: { active: number; running: number; paused: number; error: number };
  tasks: { open: number; inProgress: number; blocked: number; done: number };
  costs: { monthSpendCents: number; monthBudgetCents: number; monthUtilizationPercent: number };
  pendingApprovals: number;
}

export interface ScActivity {
  id: string;
  companyId: string;
  actorType: "user" | "agent" | string;
  actorId: string;
  action: string;
  entityType: string | null;
  entityId: string | null;
  agentId: string | null;
  runId: string | null;
  details: Record<string, unknown> | null;
  createdAt: string;
}

export interface ScTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  agentCount: number;
  tags: string[];
}

export interface ScApproval {
  id: string;
  companyId: string;
  type: string;
  requestedByAgentId: string | null;
  requestedByUserId: string | null;
  status: "pending" | "approved" | "rejected" | "revision_requested";
  payload: Record<string, unknown>;
  decisionNote: string | null;
  decidedByUserId: string | null;
  decidedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── API Methods ──────────────────────────────────────────────────────────────

export const superclip = {
  /** List all companies the current user has access to */
  listCompanies: (cookie: string) =>
    sc<ScCompany[]>("/companies", cookie),

  /** Create a new company */
  createCompany: (cookie: string, data: { name: string }) =>
    sc<ScCompany>("/companies", cookie, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** Get dashboard summary for a company */
  getDashboard: (cookie: string, companyId: string) =>
    sc<ScDashboard>(`/companies/${companyId}/dashboard`, cookie),

  /** List projects for a company */
  listProjects: (cookie: string, companyId: string) =>
    sc<ScProject[]>(`/companies/${companyId}/projects`, cookie),

  /** Create a project */
  createProject: (
    cookie: string,
    companyId: string,
    data: { name: string; description?: string; color?: string },
  ) =>
    sc<ScProject>(`/companies/${companyId}/projects`, cookie, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** Get a single project */
  getProject: (cookie: string, projectId: string) =>
    sc<ScProject>(`/projects/${projectId}`, cookie),

  /** List issues for a project */
  listIssues: (cookie: string, projectId: string) =>
    sc<ScIssue[]>(`/projects/${projectId}/issues`, cookie),

  /** List agents for a company */
  listAgents: (cookie: string, companyId: string) =>
    sc<ScAgent[]>(`/companies/${companyId}/agents`, cookie),

  /** Get recent activity for a company */
  getActivity: (cookie: string, companyId: string, limit = 20) =>
    sc<ScActivity[]>(`/companies/${companyId}/activity?limit=${limit}`, cookie),

  /** List available company templates */
  listTemplates: (cookie: string) =>
    sc<ScTemplate[]>("/templates/companies", cookie),

  /** Deploy a template for a company */
  deployTemplate: (cookie: string, companyId: string, templateId: string) =>
    sc<{ success: boolean }>(`/companies/${companyId}/templates/${templateId}/deploy`, cookie, {
      method: "POST",
    }),

  /** List approvals for a company (optionally filter by status) */
  listApprovals: (cookie: string, companyId: string, status?: string) =>
    sc<ScApproval[]>(
      `/companies/${companyId}/approvals${status ? `?status=${status}` : ""}`,
      cookie,
    ),

  /** Approve an approval */
  approveApproval: (cookie: string, approvalId: string, note?: string) =>
    sc<ScApproval>(`/approvals/${approvalId}/approve`, cookie, {
      method: "POST",
      body: JSON.stringify({ decisionNote: note }),
    }),

  /** Reject an approval */
  rejectApproval: (cookie: string, approvalId: string, note?: string) =>
    sc<ScApproval>(`/approvals/${approvalId}/reject`, cookie, {
      method: "POST",
      body: JSON.stringify({ decisionNote: note }),
    }),
};
