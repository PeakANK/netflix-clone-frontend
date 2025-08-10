'use client';

import { useEffect, useRef, useState } from 'react';
import MediaCard from './MediaCard';
import DetailModal from './DetailModal';
import { CardSkeleton } from './Skeleton';
import { apiGet } from '@/lib/api';
import type { PagedResponse, MovieListItem } from '@/types/tmdb';
import { motion, type Variants } from 'framer-motion';

type Props = {
  title: string;
  endpoint: string;
  params?: Record<string, string | number>;
  mediaType: 'movie' | 'tv';
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      when: 'beforeChildren',
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }, // was 'easeOut'
  },
};

export default function SectionRow({ title, endpoint, params, mediaType }: Props) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<MovieListItem[]>([]);
  const [ids, setIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Modal
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const fetchPage = async (p: number) => {
    if (loading || (!hasMore && p !== 1)) return;
    setLoading(true);
    try {
      const data = await apiGet<PagedResponse<MovieListItem>>(endpoint, { ...(params || {}), page: p });
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
  fetchPage(1);
}, [fetchPage]); // ✅ Now fetchPage is in deps

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
        <motion.div
          className="flex gap-4 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {isInitialLoading && Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={`sk-${i}`} />)}

          {!isInitialLoading &&
            items.map((m) => (
              <motion.div key={`${mediaType}-${m.id}-${m.poster_path ?? ''}`} variants={itemVariants}>
                <MediaCard
                  id={m.id}
                  title={(m.title ?? m.name) || 'Untitled'}
                  poster_path={m.poster_path}
                  vote_average={m.vote_average}
                  onClick={() => onCardClick(m.id)}
                />
              </motion.div>
            ))}

          <div ref={endRef} className="shrink-0 w-2 h-[1px]" />
          {isPaginating && Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={`more-${i}`} />)}
        </motion.div>
      </div>

      <DetailModal open={open} onClose={() => setOpen(false)} mediaType={mediaType} id={activeId} />
    </section>
  );
}
