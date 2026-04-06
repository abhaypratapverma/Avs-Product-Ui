import React from 'react';
import { StoreCard } from '@/components/molecules/StoreCard';
import { StoreCardSkeleton } from '@/components/atoms/Skeleton';
import type { Store } from '@/types/store.types';

interface StoreListProps {
  stores: Store[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export const StoreList: React.FC<StoreListProps> = ({
  stores,
  isLoading = false,
  skeletonCount = 4,
}) => {
  if (isLoading) {
    return (
      <div className="px-4 space-y-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 space-y-3">
      {stores.map((store) => (
        <StoreCard key={store.id} data={store} variant="full" />
      ))}
    </div>
  );
};
