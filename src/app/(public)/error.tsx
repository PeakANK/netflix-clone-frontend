"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-neutral-300">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-md bg-neutral-200 text-neutral-900 px-4 py-2 font-medium hover:bg-white">
        Try again
      </button>
    </div>
  );
}
