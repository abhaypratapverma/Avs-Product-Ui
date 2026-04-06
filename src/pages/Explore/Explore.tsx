import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Chip } from '@/components/atoms/Chip';
import { StoreCard } from '@/components/molecules/StoreCard';
import { StoreCardSkeleton } from '@/components/atoms/Skeleton';
import { useStores } from '@/queries/useStores';
import { withLocation } from '@/hoc/withLocation';
import { withGuestAccess } from '@/hoc/withGuestAccess';
import { useDebounce } from '@/hooks/useDebounce';
import type { StoreFilters } from '@/types/store.types';

type FilterOption = 'all' | 'open' | 'top-rated' | 'free-delivery' | 'express';

const filterChips: Array<{ id: FilterOption; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open Now' },
  { id: 'top-rated', label: '⭐ Top Rated' },
  { id: 'free-delivery', label: '🚚 Free Delivery' },
];

const ExplorePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const debouncedSearch = useDebounce(search, 400);

  const filters: StoreFilters = {
    search: debouncedSearch || undefined,
    isOpen: activeFilter === 'open' ? true : undefined,
    minRating: activeFilter === 'top-rated' ? 4 : undefined,
    deliveryType: activeFilter === 'free-delivery' ? 'free' : undefined,
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStores(filters);

  const stores = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <PageWrapper>
      <div className="px-4 pt-4 space-y-4">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search stores..."
        />

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterChips.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.label}
              isActive={activeFilter === chip.id}
              onClick={() => setActiveFilter(chip.id)}
            />
          ))}
        </div>

        {/* Store list */}
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <StoreCardSkeleton key={i} />)
          ) : stores.length > 0 ? (
            stores.map((store) => <StoreCard key={store.id} data={store} variant="full" />)
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-textPrimary mb-1">
                {search ? `No results for "${search}"` : 'No stores found'}
              </h3>
              <p className="text-sm text-textSecondary">
                {search ? 'Try a different search term' : 'Adjust filters and try again'}
              </p>
            </div>
          )}
        </div>

        {/* Load more */}
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full py-3 text-primary font-semibold text-sm"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more stores'}
          </button>
        )}
      </div>
    </PageWrapper>
  );
};

export default withLocation(withGuestAccess(ExplorePage));
