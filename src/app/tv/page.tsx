import SectionRow from '@/components/SectionRow';

export default function TvPage() {
  return (
    <div className="space-y-2">
      <h1 className="px-6 text-2xl font-bold mt-4">TV</h1>
      <SectionRow title="Popular" endpoint="/api/tv/popular" mediaType="tv" />
      <SectionRow title="Top Rated" endpoint="/api/tv/top_rated" mediaType="tv" />
      <SectionRow title="Airing Today" endpoint="/api/tv/airing_today" mediaType="tv" />
      <SectionRow title="On The Air" endpoint="/api/tv/on_the_air" mediaType="tv" />
    </div>
  );
}
