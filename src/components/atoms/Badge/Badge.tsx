import React from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant =
  | 'open'
  | 'closed'
  | 'sponsored'
  | 'featured'
  | 'success'
  | 'warning'
  | 'error'
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  open: 'bg-green-50 text-success border border-green-200',
  closed: 'bg-red-50 text-error border border-red-200',
  sponsored: 'bg-amber-50 text-amber-700 border border-amber-200',
  featured: 'bg-primary-50 text-primary border border-primary-200',
  success: 'bg-green-50 text-success',
  warning: 'bg-amber-50 text-warning',
  error: 'bg-red-50 text-error',
  default: 'bg-gray-100 text-textSecondary',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
