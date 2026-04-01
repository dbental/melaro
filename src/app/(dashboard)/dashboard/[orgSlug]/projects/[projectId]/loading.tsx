import { IssueListSkeleton, AgentCardSkeleton } from "@/components/shared/loading-skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="flex-1 p-6 space-y-8 overflow-auto animate-pulse">
      <div className="h-4 w-20 bg-white/5 rounded-lg" />
      <div className="flex items-start gap-4">
        <div className="mt-1 w-3 h-3 bg-white/5 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-7 w-64 bg-white/5 rounded-lg" />
          <div className="h-4 w-96 bg-white/5 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card px-4 py-3 space-y-2">
            <div className="h-3 w-12 bg-white/5 rounded" />
            <div className="h-7 w-8 bg-white/5 rounded" />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-4 w-16 bg-white/5 rounded" />
          <IssueListSkeleton />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-36 bg-white/5 rounded" />
          {Array.from({ length: 2 }).map((_, i) => <AgentCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
