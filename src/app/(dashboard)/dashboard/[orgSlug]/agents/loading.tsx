import { AgentCardSkeleton } from "@/components/shared/loading-skeleton";

export default function AgentsLoading() {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto animate-pulse">
      <div className="h-4 w-48 bg-white/5 rounded-lg" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => <AgentCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
