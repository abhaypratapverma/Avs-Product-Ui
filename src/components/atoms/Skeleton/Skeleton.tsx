import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  rounded = 'md',
}) => {
  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-shimmer',
        roundedClasses[rounded],
        className
      )}
      style={{
        backgroundImage: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
        backgroundSize: '400% 100%',
        animation: 'shimmer 1.4s ease infinite',
      }}
    />
  );
};

// Card skeleton for store cards
export const StoreCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-card">
    <Skeleton className="w-full h-36" rounded="sm" />
    <div className="p-3 flex gap-3">
      <Skeleton className="w-12 h-12 shrink-0" rounded="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
    </div>
  </div>
);

// Banner skeleton
export const BannerSkeleton: React.FC = () => (
  <Skeleton className="w-full h-44 mx-4 rounded-2xl" rounded="lg" />
);
