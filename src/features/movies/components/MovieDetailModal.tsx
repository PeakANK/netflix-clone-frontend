"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { getMovieDetailsClient } from "../data/client";
import type { MovieDetail } from "@/types/tmdb";

export default function MovieDetailModal({
  movieId,
  open,
  onClose,
}: {
  movieId: number | null;
  open: boolean;
  onClose: () => void;
}) {
  const [data, setData] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!open || movieId == null) return;

    setLoading(true);
    getMovieDetailsClient(movieId)
      .then((d) => { if (!ignore) setData(d); })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, [open, movieId]);

  return (
    <Modal open={open} onClose={onClose}>
      {loading || !data ? (
        <div className="p-6">Loading…</div>
      ) : (
        <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-neutral-800">
            {data.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
                fill
                sizes="220px"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">{data.title}</h2>
            <div className="mt-2 text-sm text-neutral-300 space-x-3">
              {data.release_date && <span>{data.release_date.slice(0, 4)}</span>}
              {data.runtime ? <span>{data.runtime} min</span> : null}
              {typeof data.vote_average === "number" ? <span>★ {data.vote_average.toFixed(1)}</span> : null}
            </div>
            {data.genres?.length ? (
              <div className="mt-2 text-sm text-neutral-400">
                {data.genres.map((g) => g.name).join(" • ")}
              </div>
            ) : null}
            <p className="mt-4 text-neutral-200 leading-relaxed">{data.overview ?? ""}</p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-md bg-red-600 px-4 py-2 font-semibold hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
