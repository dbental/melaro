"use client";

import { useState, useRef } from "react";
import type { ScActivity } from "@/lib/superclip";
import { ActivityTimeline } from "./activity-timeline";

const PAGE_SIZE = 25;

interface Props {
  initial: ScActivity[];
  companyId: string;
}

export function ActivityFeed({ initial, companyId }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [allItems, setAllItems] = useState<ScActivity[]>(initial);
  const [loading, setLoading] = useState(false);
  const fetchedAll = useRef(initial.length < PAGE_SIZE);

  const visible = allItems.slice(0, visibleCount);
  const hasMore = !fetchedAll.current || visibleCount < allItems.length;

  async function loadMore() {
    // If we have more already-fetched items, just reveal the next page
    if (visibleCount < allItems.length) {
      setVisibleCount((n) => n + PAGE_SIZE);
      return;
    }

    // Otherwise fetch all from API (once), then reveal next page
    if (fetchedAll.current) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/sc/companies/${companyId}/activity`);
      if (!res.ok) throw new Error("Failed to load");
      const all: ScActivity[] = await res.json();
      fetchedAll.current = true;
      setAllItems(all);
      setVisibleCount((n) => n + PAGE_SIZE);
    } catch {
      // silently fail — user can retry
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-6">
        Showing {visible.length}{allItems.length > visible.length ? ` of ${allItems.length}` : ""} events
      </p>
      <ActivityTimeline items={visible} />
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-5 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
