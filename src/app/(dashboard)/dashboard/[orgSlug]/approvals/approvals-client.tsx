"use client";

import { useState } from "react";
import type { ScApproval } from "@/lib/superclip";
import { ProposalCard } from "@/components/approvals/proposal-card";

interface Props {
  companyId: string;
  initialPending: ScApproval[];
  initialResolved: ScApproval[];
}

export function ApprovalsClient({ companyId, initialPending, initialResolved }: Props) {
  const [pending, setPending] = useState(initialPending);
  const [resolved, setResolved] = useState(initialResolved);
  const [tab, setTab] = useState<"pending" | "resolved">("pending");

  const handleApprove = async (id: string, note?: string) => {
    const res = await fetch(`/api/sc/approvals/${id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ decisionNote: note }),
    });

    if (res.ok) {
      const updated = await res.json() as ScApproval;
      setPending((prev) => prev.filter((a) => a.id !== id));
      setResolved((prev) => [updated, ...prev]);
    }
  };

  const handleReject = async (id: string, note: string) => {
    const res = await fetch(`/api/sc/approvals/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ decisionNote: note }),
    });

    if (res.ok) {
      const updated = await res.json() as ScApproval;
      setPending((prev) => prev.filter((a) => a.id !== id));
      setResolved((prev) => [updated, ...prev]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 bg-surface rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === "pending"
              ? "bg-primary/20 text-primary"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          Pending{pending.length > 0 && ` (${pending.length})`}
        </button>
        <button
          onClick={() => setTab("resolved")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === "resolved"
              ? "bg-primary/20 text-primary"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          Resolved{resolved.length > 0 && ` (${resolved.length})`}
        </button>
      </div>

      {/* Content */}
      {tab === "pending" && (
        <div>
          {pending.length === 0 ? (
            <div className="text-center py-16 text-white/40">
              <p className="text-lg">No pending approvals</p>
              <p className="text-sm mt-1">All caught up! Agents will create approvals when they need your input.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pending.map((approval) => (
                <ProposalCard
                  key={approval.id}
                  approval={approval}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "resolved" && (
        <div>
          {resolved.length === 0 ? (
            <div className="text-center py-16 text-white/40">
              <p className="text-lg">No resolved approvals yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {resolved.map((approval) => (
                <div
                  key={approval.id}
                  className="bg-elevated border border-white/5 rounded-lg px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        approval.status === "approved" ? "bg-emerald-400" : "bg-red-400"
                      }`}
                    />
                    <span className="text-sm text-white">
                      {(approval.payload.title as string) ?? approval.type.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs text-white/30">{approval.status}</span>
                  </div>
                  {approval.decidedAt && (
                    <span className="text-xs text-white/30">
                      {new Date(approval.decidedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
