// src/components/atoms/Rating/Rating.tsx
import { Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function Rating({ value, count, size = 'sm', className }: RatingProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <Star
        className={cn(
          'fill-amber-400 text-amber-400',
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
        )}
      />
      <span className={cn('font-semibold text-gray-800', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={cn('text-muted', size === 'sm' ? 'text-xs' : 'text-sm')}>
          ({count})
        </span>
      )}
    </span>
  );
}
