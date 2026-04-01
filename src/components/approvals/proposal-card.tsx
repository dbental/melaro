"use client";

import { useState } from "react";
import type { ScApproval } from "@/lib/superclip";

interface ProposalCardProps {
  approval: ScApproval;
  onApprove: (id: string, note?: string) => Promise<void>;
  onReject: (id: string, note: string) => Promise<void>;
}

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    hire_agent: "Hire Agent",
    budget_change: "Budget Change",
    config_change: "Config Change",
    strategy_proposal: "Strategy Proposal",
    hitl_checkpoint: "Agent Checkpoint",
  };
  return labels[type] ?? type.replace(/_/g, " ");
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ProposalCard({ approval, onApprove, onReject }: ProposalCardProps) {
  const [rejectNote, setRejectNote] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await onApprove(approval.id);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    setLoading(true);
    try {
      await onReject(approval.id, rejectNote);
    } finally {
      setLoading(false);
    }
  };

  const summary =
    (approval.payload.summary as string) ??
    (approval.payload.description as string) ??
    (approval.payload.reason as string) ??
    "No description provided";

  const agentName =
    (approval.payload.agentName as string) ??
    (approval.payload.requestedBy as string) ??
    "Agent";

  const estimatedCost = approval.payload.estimatedCostCents
    ? `$${(Number(approval.payload.estimatedCostCents) / 100).toFixed(2)}/mo`
    : null;

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
            {typeLabel(approval.type)}
          </span>
          <h3 className="text-sm font-semibold text-white truncate">
            {(approval.payload.title as string) ?? typeLabel(approval.type)}
          </h3>
        </div>
        <span className="text-xs text-white/40 shrink-0">{timeAgo(approval.createdAt)}</span>
      </div>

      {/* Body */}
      <p className="text-sm text-white/60 line-clamp-3">{summary}</p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-white/40">
        <span>From: {agentName}</span>
        {estimatedCost && (
          <span className="text-amber-400">{estimatedCost}</span>
        )}
      </div>

      {/* Reject note input */}
      {showRejectInput && (
        <input
          type="text"
          placeholder="Reason for rejection (optional)..."
          value={rejectNote}
          onChange={(e) => setRejectNote(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-background border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      )}

      {/* Action buttons — thumbs up / thumbs down */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
          Approve
        </button>
        <button
          onClick={handleReject}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L14 22h0a3.13 3.13 0 0 1-3-3.88Z" />
          </svg>
          Reject
        </button>
      </div>
    </div>
  );
}
