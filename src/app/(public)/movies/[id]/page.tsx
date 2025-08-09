import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = await params;
  const movieId = Number(id);

  const [details, credits, videos] = await Promise.all([
    getMovieDetails(movieId, ["images", "videos"]),
    getMovieCredits(movieId),
    getMovieVideos(movieId),
  ]);

  const backdrop = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="relative h-[60vh] w-full">
        {/* {backdrop && (
          <Image
            src={backdrop}
            alt={details.title}
            fill
            priority
            className="object-cover"
          />
        )} */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl md:text-5xl font-bold">{details.title}</h1>
          <p className="mt-2 text-sm max-w-xl">{details.overview}</p>
        </div>
      </div>

      <div className="px-6 py-10 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {credits.cast.slice(0, 12).map((c: any) => (
              <div key={c.cast_id} className="shrink-0 w-28">
                {/* {c.profile_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                    alt={c.name}
                    width={112}
                    height={168}
                    className="rounded-md object-cover"
                  />
                )} */}
                <p className="mt-1 text-xs font-medium">{c.name}</p>
                <p className="text-xs text-neutral-400">{c.character}</p>
              </div>
            ))}
          </div>
        </section>

        {videos.results.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.results.slice(0, 4).map((v: any) => (
                <iframe
                  key={v.id}
                  src={`https://www.youtube.com/embed/${v.key}`}
                  title={v.name}
                  className="w-full aspect-video rounded-md"
                  allowFullScreen
                />
              ))}
            </div>
          </section>
        )}

        <Link href="/" className="block text-red-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
