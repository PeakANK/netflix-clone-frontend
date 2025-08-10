'use client';

import { useEffect, useState } from 'react';
import { getMyList, toggleInMyList, ListItem } from '@/lib/utils';

type Props = { item: ListItem };

export default function AddToListButton({ item }: Props) {
  const [inList, setInList] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setInList(getMyList().some(x => x.id === item.id && x.type === item.type));
  }, [item]);

  const onToggle = () => {
    const next = toggleInMyList(item);
    setInList(next.some(x => x.id === item.id && x.type === item.type));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Circle button */}
      <button
        onClick={onToggle}
        className="
          w-10 h-10 flex items-center justify-center 
          rounded-full 
          bg-white/15 hover:bg-white/25 
          transition-colors
        "
      >
        <span className="text-2xl leading-none text-white">
          {inList ? '✓' : '＋'}
        </span>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2 mt-2
            px-2 py-1 text-xs font-medium
            bg-black text-white rounded
            whitespace-nowrap
            z-10
          "
        >
          {inList ? 'Remove from My List' : 'Add to My List'}
        </div>
      )}
    </div>
  );
}
