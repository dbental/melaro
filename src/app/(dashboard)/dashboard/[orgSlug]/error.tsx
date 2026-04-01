"use client";

import { DashboardError } from "@/components/shared/error-boundary";

export default function OrgError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <DashboardError message={error.message} onRetry={reset} />;
}
