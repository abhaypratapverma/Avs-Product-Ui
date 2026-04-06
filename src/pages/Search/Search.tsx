// src/pages/Search/Search.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { SearchBar } from '../../components/molecules/SearchBar';
import { StoreCard } from '../../components/molecules/StoreCard';
import { ProductCard } from '../../components/molecules/ProductCard';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppSelector } from '../../store';
import { useDebounce } from '../../hooks/useDebounce';
import { MOCK_STORES } from '../../mock/stores.mock';
import { MOCK_PRODUCTS } from '../../mock/products.mock';

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'stores' | 'products'>('stores');
  const districtCode = useAppSelector((s) => s.location.districtCode ?? '');
  const dq = useDebounce(query, 250);

  const stores = dq
    ? MOCK_STORES.filter(s =>
        s.districtCode === districtCode &&
        (s.name.toLowerCase().includes(dq.toLowerCase()) ||
         s.category.toLowerCase().includes(dq.toLowerCase()))
      )
    : [];

  const products = dq
    ? MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(dq.toLowerCase()) ||
        p.category.toLowerCase().includes(dq.toLowerCase())
      )
    : [];

  const storeForProduct = (storeId: number) =>
    MOCK_STORES.find(s => s.id === storeId)?.name ?? '';

  return (
    <PageWrapper>
      <div className="px-4 py-3 bg-white border-b border-border flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search stores, products..."
          autoFocus
          className="flex-1"
        />
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-border">
        {(['stores', 'products'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 capitalize transition-colors ${
              tab === t ? 'border-primary text-primary' : 'border-transparent text-muted'
            }`}
          >
            {t} {dq && `(${t === 'stores' ? stores.length : products.length})`}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        {!dq ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-semibold text-gray-700">Search for stores & products</p>
            <p className="text-muted text-sm mt-1">Type above to get started</p>
          </div>
        ) : tab === 'stores' ? (
          stores.length === 0 ? (
            <EmptyState
              illustration="🏪"
              title={`No results for "${dq}"`}
              subtitle="Try a different store name or category"
            />
          ) : (
            <div className="flex flex-col gap-4">
              {stores.map(store => <StoreCard key={store.id} store={store} variant="full" />)}
            </div>
          )
        ) : (
          products.length === 0 ? (
            <EmptyState
              illustration="📦"
              title={`No products for "${dq}"`}
              subtitle="Try a different product name"
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {products.map(p => (
                <ProductCard key={p.id} product={p} variant="grid" storeName={storeForProduct(p.storeId)} />
              ))}
            </div>
          )
        )}
      </div>
    </PageWrapper>
  );
}
