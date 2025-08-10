// src/app/(public)/loading.tsx  OR  src/app/loading.tsx
export default function Loading() {
  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <div className="h-[50vh] w-full animate-pulse rounded-md bg-neutral-800/60" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] w-full animate-pulse rounded-md bg-neutral-800/60" />
        ))}
      </div>
    </div>
  );
}