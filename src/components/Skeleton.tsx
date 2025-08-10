export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-white/10 rounded ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="w-[154px] sm:w-[180px] md:w-[200px] shrink-0">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/10" />
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
