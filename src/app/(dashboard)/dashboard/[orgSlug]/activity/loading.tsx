import { ActivityTimelineSkeleton } from "@/components/shared/loading-skeleton";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className ?? ""}`} />;
}

export default function ActivityLoading() {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto">
      {/* Topbar placeholder */}
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-4">
          <ActivityTimelineSkeleton />
        </div>
      </div>
    </div>
  );
}
