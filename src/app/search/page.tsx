'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import type { PagedResponse, MovieListItem } from '@/types/tmdb';
import MediaCard from '@/components/MediaCard';
import AddToListButton from '@/components/AddToListButton';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<MovieListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setMore] = useState(false);

  const doSearch = async (reset = false) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const p = reset ? 1 : page;
      const data = await apiGet<PagedResponse<MovieListItem>>('/api/search', { q, page: p });
      setResults(reset ? data.results : [...results, ...data.results]);
      setMore(p < data.total_pages);
      setPage(p);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => { if (q.trim()) doSearch(true); }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="px-6">
      {/* If no results, center the search input */}
      {results.length === 0 && !loading ? (
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold mb-4">Search</h1>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search movies or TV shows…"
            className="w-full max-w-xl bg-neutral-900 rounded-md px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-red-500"
          />
        </div>
      ) : (
        <>
          {/* Search bar stays on top after results */}
          <div className="sticky top-0 z-10 bg-black py-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search movies or TV shows…"
              className="w-full max-w-xl bg-neutral-900 rounded-md px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-red-500"
            />
          </div>

          {/* Results */}
          <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fill,minmax(154px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {results.map((m) => (
              <MediaCard
                key={`${m.media_type}-${m.id}-${m.poster_path}`}
                id={m.id}
                title={(m.title ?? m.name) || 'Untitled'}
                poster_path={m.poster_path}
                vote_average={m.vote_average}
                footer={
                  <AddToListButton
                    item={{
                      id: m.id,
                      type: m.title ? 'movie' : 'tv',
                      title: (m.title ?? m.name) || 'Untitled',
                      poster: m.poster_path
                    }}
                  />
                }
              />
            ))}
          </div>

          {/* Load more */}
          {hasMore && !loading && (
            <div className="mt-6 text-center">
              <button
                onClick={() => { setPage(p => p + 1); setTimeout(() => doSearch(false), 0); }}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}

      {loading && <div className="mt-4 text-white/70 text-center">Loading…</div>}
    </div>
  );
}
