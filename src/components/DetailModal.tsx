// src/components/DetailModal.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import { apiGet } from '@/lib/api';
import { imageUrl } from '@/lib/queries';
import AddToListButton from './AddToListButton';

type Props = {
  open: boolean;
  onClose: () => void;
  mediaType: 'movie' | 'tv';
  id: number | null;
};

type Video = { key: string; site: string; type: string; official?: boolean };
type Cast = { id: number; name: string; character?: string; profile_path?: string | null };

export default function DetailModal({ open, onClose, mediaType, id }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const endpoint = useMemo(() => {
    if (!id) return null;
    return mediaType === 'movie'
      ? `/api/movies/details/${id}`
      : `/api/tv/details/${id}`;
  }, [mediaType, id]);

  useEffect(() => {
    if (!open || !endpoint) return;
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await apiGet<any>(endpoint, { language: 'en-US' });
        if (!ignore) setData(res);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [open, endpoint]);

  const title = mediaType === 'movie' ? data?.title : data?.name;
  const year =
    (mediaType === 'movie' ? data?.release_date : data?.first_air_date)?.slice?.(0, 4);
  const runtime =
    mediaType === 'movie'
      ? (data?.runtime ? `${data.runtime} min` : null)
      : (data?.episode_run_time?.[0] ? `${data.episode_run_time[0]} min/ep` : null);
  const seasons =
    mediaType === 'tv'
      ? data?.number_of_seasons
        ? `${data.number_of_seasons} seasons`
        : null
      : null;

  const videos: Video[] = data?.videos?.results ?? [];
  const trailer = videos.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'),
  );
  const cast: Cast[] = data?.credits?.cast?.slice?.(0, 10) ?? [];

  return (
    <Modal open={open} onClose={onClose}>
      {/* ⬇️ NEW WRAPPER: scrolls but hides scrollbar */}
      <div className="max-h-[88vh] overflow-y-auto scrollbar-hide">
        {/* Banner */}
        <div className="relative w-full aspect-[16/9] bg-black rounded-t-2xl overflow-hidden">
          {data?.backdrop_path ? (
            <Image
              src={imageUrl(data.backdrop_path, 'original')}
              alt={title || 'backdrop'}
              fill
              className="object-cover opacity-70"
              priority
            />
          ) : null}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-black/60 hover:bg-black/70 ring-1 ring-white/10"
            aria-label="Close"
          >
            ✕
          </button>
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 left-3 px-3 py-1.5 rounded bg-white text-black text-sm font-semibold"
            >
              ▶ Watch Trailer
            </a>
          )}
        </div>

        {/* Body */}
        <div className="p-5 md:p-6">
          {loading ? (
            <div className="space-y-3">
              <div className="animate-pulse h-7 w-2/3 bg-white/10 rounded" />
              <div className="animate-pulse h-4 w-1/3 bg-white/10 rounded" />
              <div className="animate-pulse h-20 w-full bg-white/10 rounded" />
              <div className="mt-6">
                <div className="animate-pulse h-5 w-24 bg-white/10 rounded mb-3" />
                <div className="flex gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="shrink-0">
                      <div className="animate-pulse h-[150px] w-[120px] bg-white/10 rounded-lg" />
                      <div className="animate-pulse h-3 w-[100px] bg-white/10 rounded mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Title row */}
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  {title}{' '}
                  {year ? (
                    <span className="text-white/50 text-xl font-normal">({year})</span>
                  ) : null}
                </h2>

                {/* Add / Remove lives here now */}
                {data?.id && (
                  <div className="ml-auto flex gap-2">
                    <AddToListButton
                      item={{
                        id: data.id,
                        type: mediaType,
                        title: (data.title ?? data.name) || 'Untitled',
                        poster: data.poster_path ?? null,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="mt-2 text-white/80 text-sm flex flex-wrap gap-x-3 gap-y-1">
                {mediaType === 'movie' && runtime && <span>{runtime}</span>}
                {mediaType === 'tv' && seasons && <span>{seasons}</span>}
                {typeof data?.vote_average === 'number' && (
                  <span>⭐ {Math.round(data.vote_average * 10) / 10}</span>
                )}
                {data?.genres?.length ? (
                  <span>{data.genres.map((g: any) => g.name).join(', ')}</span>
                ) : null}
              </div>

              {data?.overview && (
                <p className="mt-4 text-sm leading-6 text-white/85">{data.overview}</p>
              )}

              {cast.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3">Top Cast</h3>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pr-2">
                    {cast.map((c) => (
                      <div key={c.id} className="shrink-0 w-[120px]">
                        <div className="relative h-[150px] w-[120px] rounded-lg overflow-hidden bg-white/5">
                          {c.profile_path ? (
                            <Image
                              src={imageUrl(c.profile_path, 'w342')}
                              alt={c.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center text-white/40 text-xs">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="mt-1 text-xs font-semibold line-clamp-2">
                          {c.name}
                        </div>
                        {c.character && (
                          <div className="text-[11px] text-white/60 line-clamp-1">
                            {c.character}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
