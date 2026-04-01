import { ProjectCardSkeleton } from "@/components/shared/loading-skeleton";

export default function ProjectsLoading() {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 bg-white/5 rounded-lg" />
        <div className="h-9 w-32 bg-white/5 rounded-lg" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
