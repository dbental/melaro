"use client";

import { useRealtime } from "@/hooks/use-realtime";

/**
 * Mounts the WebSocket connection for a given company.
 * Must be rendered inside QueryProvider.
 */
export function RealtimeProvider({ companyId }: { companyId: string }) {
  useRealtime({ companyId });
  return null;
}
