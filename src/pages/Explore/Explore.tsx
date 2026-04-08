// src/pages/Explore/Explore.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { SearchBar } from '../../components/molecules/SearchBar';
import { StoreCard } from '../../components/molecules/StoreCard';
import { CategoryRow } from '../../components/organisms/CategoryRow';
import { Skeleton } from '../../components/atoms/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { useGetStoresQuery } from '../../api/services/storeApi';
import { useGetCategoriesQuery } from '../../api/services/homeApi';
import { useAppSelector } from '../../store';
import { useDebounce } from '../../hooks/useDebounce';

export function Explore() {
  const navigate = useNavigate();
  const districtCode = useAppSelector((s) => s.location.districtCode ?? '');
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const debouncedQuery = useDebounce(query);

  const { data: categories } = useGetCategoriesQuery();
  const skip = !districtCode;
  const { data: stores, isLoading } = useGetStoresQuery(districtCode, { skip });

  const selectedCat = categories?.find((c) => c.slug === selectedCategory);
  const byCategory =
    selectedCategory === 'all'
      ? (stores ?? [])
      : (stores ?? []).filter((s) =>
          selectedCat ? s.category.toLowerCase() === selectedCat.name.toLowerCase() : true,
        );

  const filtered = byCategory.filter(
    (s) =>
      !debouncedQuery ||
      s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <PageWrapper>
      <div className="px-4 pt-4 pb-0 bg-white border-b border-border sticky top-0 z-10">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search stores..."
          className="mb-3"
        />
        <CategoryRow
          categories={categories ?? []}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          className="mb-0 pb-3"
        />
      </div>

      <div className="px-4 py-4">
        <p className="text-xs text-muted mb-3 font-medium">
          {isLoading ? 'Loading stores...' : `${filtered.length} stores found`}
        </p>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-card overflow-hidden shadow-card">
                <Skeleton shape="banner" height="140px" className="rounded-none" />
                <div className="p-3 flex flex-col gap-2 pt-6">
                  <Skeleton height="16px" width="60%" />
                  <Skeleton height="12px" width="40%" />
                  <Skeleton shape="line" lines={2} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            illustration="🔍"
            title={debouncedQuery ? `No results for "${debouncedQuery}"` : 'No stores found'}
            subtitle={debouncedQuery ? 'Try a different search term' : 'Try changing your category filter'}
            action={debouncedQuery ? { label: 'Browse all stores', onClick: () => setQuery('') } : undefined}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(store => (
              <StoreCard key={store.id} store={store} variant="full" />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
