'use client';

import Image from 'next/image';
import { imageUrl } from '@/lib/queries';

type Props = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number;
  onClick?: () => void;
  footer?: React.ReactNode;
};

export default function MediaCard({ title, poster_path, vote_average, onClick, footer }: Props) {
  return (
    <div
      className="w-[154px] sm:w-[180px] md:w-[200px] shrink-0 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
        {poster_path ? (
          <Image
            src={imageUrl(poster_path, 'w342')}
            alt={title}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : <div className="absolute inset-0 grid place-items-center text-white/50">No Image</div>}
      </div>
      <div className="mt-2">
        <div className="text-sm font-semibold line-clamp-2">{title}</div>
        {typeof vote_average === 'number' && (
          <div className="text-xs text-white/60">⭐ {Math.round(vote_average * 10) / 10}</div>
        )}
        {footer}
      </div>
    </div>
  );
}
