import { getMovie } from "@/lib/movies";
import { backdrop } from "@/lib/image";

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);
  const title = movie.title ?? "Movie";

  return (
    <div>
      <div className="relative aspect-[16/7]">
        <img src={backdrop(movie.backdrop_path)} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold">{title}</h1>
      </div>
      <div className="mx-auto max-w-5xl p-6">
        <p className="text-neutral-200">{movie.overview}</p>
      </div>
    </div>
  );
}
