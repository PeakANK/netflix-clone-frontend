'use client';

import { useEffect, useState } from 'react';
import { getMyList, toggleInMyList, ListItem } from '@/lib/utils';

type Props = { item: ListItem };

export default function AddToListButton({ item }: Props) {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(getMyList().some(x => x.id === item.id && x.type === item.type));
  }, [item]);

  const onToggle = () => {
    const next = toggleInMyList(item);
    setInList(next.some(x => x.id === item.id && x.type === item.type));
  };

  return (
    <button
      onClick={onToggle}
      className="mt-1 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
    >
      {inList ? 'Remove' : 'Add'}
    </button>
  );
}
