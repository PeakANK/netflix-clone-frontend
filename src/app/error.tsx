"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-950 text-white px-6">
      <div className="text-center max-w-lg">
        <div className="mx-auto mb-6 h-10 w-10 rounded bg-yellow-500/90 grid place-items-center font-bold">!</div>
        <h1 className="text-3xl md:text-4xl font-extrabold">Something went wrong</h1>
        <p className="mt-3 text-neutral-300">{error.message}</p>
        <button onClick={() => reset()} className="mt-6 inline-flex items-center justify-center rounded-md bg-yellow-500 px-5 py-2.5 font-semibold hover:bg-yellow-600 transition">
          Try again
        </button>
      </div>
    </div>
  );
}
