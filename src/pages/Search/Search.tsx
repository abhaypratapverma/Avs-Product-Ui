import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { SearchBar } from '@/components/molecules/SearchBar';
import { StoreCard } from '@/components/molecules/StoreCard';
import { StoreCardSkeleton } from '@/components/atoms/Skeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { useStores } from '@/queries/useStores';
import { withLocation } from '@/hoc/withLocation';
import { withGuestAccess } from '@/hoc/withGuestAccess';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const { data, isLoading } = useStores(
    debouncedQuery ? { search: debouncedQuery } : undefined
  );

  const stores = data?.pages.flatMap((p) => p.items) ?? [];

  const showResults = debouncedQuery.length > 0;

  return (
    <PageWrapper>
      <div className="px-4 pt-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-textPrimary" />
          </button>
          <div className="flex-1">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search stores, products..."
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        {!showResults && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-textSecondary text-sm">Start typing to search</p>
          </div>
        )}

        {showResults && isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <StoreCardSkeleton key={i} />
            ))}
          </div>
        )}

        {showResults && !isLoading && stores.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="font-semibold text-textPrimary mb-1">
              No results for "{debouncedQuery}"
            </h3>
            <p className="text-sm text-textSecondary">
              Try searching for stores instead
            </p>
          </div>
        )}

        {showResults && !isLoading && stores.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-textSecondary">
              {stores.length} store{stores.length !== 1 ? 's' : ''} found
            </p>
            {stores.map((store) => (
              <StoreCard key={store.id} data={store} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default withLocation(withGuestAccess(SearchPage));
