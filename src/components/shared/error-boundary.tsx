"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <DashboardError
          message={this.state.message}
          onRetry={() => this.setState({ hasError: false, message: "" })}
        />
      );
    }
    return this.props.children;
  }
}

export function DashboardError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-12 text-center">
      <div className="w-12 h-12 rounded-full bg-warm/10 border border-warm/20 flex items-center justify-center mb-4">
        <AlertTriangle size={20} className="text-warm" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">
        Something went wrong
      </h3>
      {message && (
        <p className="text-xs text-muted-foreground max-w-xs mb-4">{message}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <RefreshCw size={13} />
          Try again
        </button>
      )}
    </div>
  );
}

/** Inline error for smaller sections (cards, lists, etc.) */
export function InlineError({ message }: { message?: string }) {
  return (
    <div className="rounded-xl border border-warm/20 bg-warm/5 px-4 py-3 flex items-center gap-2">
      <AlertTriangle size={14} className="text-warm shrink-0" />
      <p className="text-xs text-warm-deep">
        {message ?? "Failed to load. Please refresh."}
      </p>
    </div>
  );
}
