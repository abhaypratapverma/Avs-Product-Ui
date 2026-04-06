import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  count,
  size = 'sm',
  className,
}) => {
  const starSize = size === 'sm' ? 12 : 14;

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <Star
        size={starSize}
        className="text-amber-400 fill-amber-400"
      />
      <span
        className={cn(
          'font-semibold text-textPrimary',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}
      >
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span
          className={cn(
            'text-textSecondary',
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}
        >
          ({count})
        </span>
      )}
    </span>
  );
};
