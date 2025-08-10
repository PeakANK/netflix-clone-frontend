'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import MediaCard from './MediaCard';
import AddToListButton from './AddToListButton';
import DetailModal from './DetailModal';
import { CardSkeleton } from './Skeleton';
import { apiGet } from '@/lib/api';
import type { PagedResponse, MovieListItem } from '@/types/tmdb';

type Props = {
  title: string;
  endpoint: string;                 // e.g. "/api/movies/popular" or "/api/tv/popular"
  params?: Record<string, string | number>;
  mediaType: 'movie' | 'tv';
};

export default function SectionRow({ title, endpoint, params, mediaType }: Props) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<MovieListItem[]>([]);
  const [ids, setIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);     // both initial + pagination
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Modal
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const q = useMemo(() => ({ page, ...params }), [page, params]);

  const fetchPage = async (p: number) => {
    if (loading || (!hasMore && p !== 1)) return;
    setLoading(true);
    try {
      const data = await apiGet<PagedResponse<MovieListItem>>(endpoint, { ...params, page: p });
      setItems(prev => {
        const next: MovieListItem[] = p === 1 ? [] : [...prev];
        const newIds = p === 1 ? new Set<number>() : new Set(ids);
        for (const it of data.results ?? []) {
          if (!newIds.has(it.id)) {
            newIds.add(it.id);
            next.push(it);
          }
        }
        setIds(newIds);
        return next;
      });
      setHasMore(p < (data.total_pages ?? p));
      setPage(p);
    } catch {
      if (p === 1) setItems([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // reset + first page on endpoint/params change
  useEffect(() => {
    setPage(1);
    setItems([]);
    setIds(new Set());
    setHasMore(true);
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, JSON.stringify(params)]);

  // observe end-of-row inside the horizontal scroller
  useEffect(() => {
    const scroller = scrollRef.current;
    const sentinel = endRef.current;
    if (!scroller || !sentinel) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading && items.length > 0) {
          fetchPage(page + 1);
        }
      },
      { root: scroller, rootMargin: '400px', threshold: 0.1 }
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, [hasMore, loading, page, items.length]);

  const onCardClick = (id: number) => {
    setActiveId(id);
    setOpen(true);
  };

  const isInitialLoading = loading && items.length === 0;
  const isPaginating = loading && items.length > 0;

  return (
    <section className="my-8">
      <h2 className="text-xl font-bold px-6 mb-3">{title}</h2>

      <div ref={scrollRef} className="no-scrollbar overflow-x-auto px-6">
        <div className="flex gap-4 items-start">
          {/* Initial skeletons */}
          {isInitialLoading && (
            <>
              {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={`sk-${i}`} />)}
            </>
          )}

          {/* Real items */}
          {!isInitialLoading && items.map((m) => (
            <MediaCard
              key={`${mediaType}-${m.id}-${m.poster_path ?? ''}`}
              id={m.id}
              title={(m.title ?? m.name) || 'Untitled'}
              poster_path={m.poster_path}
              vote_average={m.vote_average}
              onClick={() => onCardClick(m.id)}
              footer={
                <AddToListButton
                  item={{
                    id: m.id,
                    type: mediaType,
                    title: (m.title ?? m.name) || 'Untitled',
                    poster: m.poster_path ?? null
                  }}
                />
              }
            />
          ))}

          {/* Sentinel */}
          <div ref={endRef} className="shrink-0 w-2 h-[1px]" />

          {/* Pagination skeletons */}
          {isPaginating && (
            <>
              {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={`more-${i}`} />)}
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        open={open}
        onClose={() => setOpen(false)}
        mediaType={mediaType}
        id={activeId}
      />
    </section>
  );
}
