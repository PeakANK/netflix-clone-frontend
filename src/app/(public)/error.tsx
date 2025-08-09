"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6 text-neutral-400">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
      >
        Try Again
      </button>
    </div>
  );
}