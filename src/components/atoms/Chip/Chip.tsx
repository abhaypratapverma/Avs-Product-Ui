import React from 'react';
import { cn } from '@/utils/cn';

interface ChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  isActive = false,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap',
        isActive
          ? 'bg-primary text-white shadow-sm'
          : 'bg-white text-textSecondary border border-border hover:border-primary hover:text-primary',
        className
      )}
    >
      {label}
    </button>
  );
};
