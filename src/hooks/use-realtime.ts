"use client";

import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

type RealtimeEvent = {
  type: string;
  payload?: unknown;
};

type Handler = (event: RealtimeEvent) => void;

const SUPERCLIP_WS_BASE =
  (typeof window !== "undefined"
    ? window.location.origin.replace(/^http/, "ws")
    : "ws://localhost:3200") + "/api/ws";

/**
 * Connects to Superclip's WebSocket for a given companyId and dispatches
 * events to registered handlers. Auto-reconnects with exponential back-off.
 *
 * Usage:
 *   useRealtime({ companyId, onEvent: (e) => console.log(e) })
 *
 * The hook also automatically invalidates React Query caches when agent
 * status, project, or activity events arrive.
 */
export function useRealtime({
  companyId,
  onEvent,
  disabled = false,
}: {
  companyId: string;
  onEvent?: Handler;
  disabled?: boolean;
}) {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const attemptRef = useRef(0);
  const onEventRef = useRef<Handler | undefined>(onEvent);

  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  const invalidateForEvent = useCallback(
    (type: string) => {
      if (type.startsWith("agent")) {
        queryClient.invalidateQueries({ queryKey: ["agents", companyId] });
      }
      if (type.startsWith("project") || type.startsWith("issue")) {
        queryClient.invalidateQueries({ queryKey: ["projects", companyId] });
      }
      if (type.startsWith("activity") || type.startsWith("cost")) {
        queryClient.invalidateQueries({ queryKey: ["dashboard", companyId] });
      }
      if (type.startsWith("approval")) {
        queryClient.invalidateQueries({ queryKey: ["approvals", companyId] });
        queryClient.invalidateQueries({ queryKey: ["dashboard", companyId] });
      }
    },
    [queryClient, companyId],
  );

  const connect = useCallback(() => {
    if (disabled || !companyId) return;

    // Proxy through our Next.js API so the WS URL doesn't expose Superclip internals
    // The proxy route is /api/sc-ws/[companyId] — see route.ts
    // Fallback: connect directly to Superclip WS (dev mode)
    const url = `${SUPERCLIP_WS_BASE}?companyId=${companyId}`;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      attemptRef.current = 0;
    };

    ws.onmessage = (event) => {
      let parsed: RealtimeEvent;
      try {
        parsed = JSON.parse(event.data as string) as RealtimeEvent;
      } catch {
        return;
      }
      invalidateForEvent(parsed.type);
      onEventRef.current?.(parsed);
    };

    ws.onclose = () => {
      wsRef.current = null;
      if (disabled) return;
      // Exponential back-off: 1s, 2s, 4s … capped at 30s
      const delay = Math.min(1000 * 2 ** attemptRef.current, 30_000);
      attemptRef.current += 1;
      reconnectTimer.current = setTimeout(connect, delay);
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [companyId, disabled, invalidateForEvent]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [connect]);
}
