// src/components/organisms/CategoryRow/CategoryRow.tsx
import { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Chip } from '../../atoms/Chip';
import { Skeleton } from '../../atoms/Skeleton';
import type { Category } from '../../../types/store.types';

interface CategoryRowProps {
  categories: Category[];
  isLoading?: boolean;
  onSelect: (slug: string) => void;
  selected?: string;
  className?: string;
}

export function CategoryRow({ categories, isLoading, onSelect, selected = 'all', className }: CategoryRowProps) {
  if (isLoading) {
    return (
      <div className={cn('scroll-row', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} width="80px" height="36px" className="rounded-chip" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('scroll-row', className)}>
      {categories.map((cat) => (
        <Chip
          key={cat.id}
          label={cat.name}
          icon={cat.icon}
          selected={selected === cat.slug}
          onClick={() => onSelect(cat.slug)}
        />
      ))}
    </div>
  );
}
