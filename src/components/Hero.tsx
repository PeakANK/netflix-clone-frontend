import Image from 'next/image';
import { imageUrl } from '@/lib/queries';

type Props = {
  title: string;
  overview?: string;
  backdrop_path?: string | null;
};

export default function Hero({ title, overview, backdrop_path }: Props) {
  return (
    <section className="relative h-[45vw] min-h-[320px] w-full">
      {backdrop_path && (
        <Image
          src={imageUrl(backdrop_path, 'original')}
          alt={title}
          fill
          priority
          className="object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-10 left-6 max-w-2xl space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
        {overview && <p className="text-sm md:text-base text-white/80 line-clamp-3">{overview}</p>}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-black rounded-md font-semibold">Play</button>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md">More Info</button>
        </div>
      </div>
    </section>
  );
}
