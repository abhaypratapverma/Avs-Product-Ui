// src/pages/StoreDetail/StoreDetail.tsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Phone, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { ProductCard } from '../../components/molecules/ProductCard';
import { Rating } from '../../components/atoms/Rating';
import { Badge } from '../../components/atoms/Badge';
import { Chip } from '../../components/atoms/Chip';
import { Skeleton } from '../../components/atoms/Skeleton';
import { useGetStoreDetailQuery, useGetStoreProductsQuery } from '../../api/services/storeApi';
import { formatCurrency } from '../../utils/formatCurrency';

export function StoreDetail() {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const id = Number(storeId);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const { data: store, isLoading: storeLoading } = useGetStoreDetailQuery(id);
  const { data: products, isLoading: productsLoading } = useGetStoreProductsQuery({ storeId: id, category: selectedCategory });

  const categories = [...new Set((products ?? []).map(p => p.category))];

  if (storeLoading) {
    return (
      <div className="flex flex-col gap-0">
        <Skeleton shape="banner" height="200px" className="rounded-none" />
        <div className="px-4 py-4 flex flex-col gap-3">
          <Skeleton shape="circle" width="60px" height="60px" />
          <Skeleton shape="line" height="20px" width="60%" />
          <Skeleton shape="line" height="14px" width="40%" />
          <Skeleton shape="line" lines={2} />
        </div>
      </div>
    );
  }

  if (!store) return (
    <div className="flex flex-col items-center py-20">
      <p className="font-semibold text-gray-800">Store not found</p>
      <button onClick={() => navigate(-1)} className="text-primary text-sm mt-2">Go back</button>
    </div>
  );

  return (
    <PageWrapper>
      {/* Header Banner */}
      <div className="relative">
        <div className="h-[200px] overflow-hidden">
          <img src={store.bannerUrl} alt={store.name} className="w-full h-full object-cover" />
        </div>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        {/* Top right actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
            <Share2 className="w-4 h-4 text-gray-700" />
          </button>
          <button className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
            <Phone className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        {/* Store logo */}
        <div className="absolute -bottom-5 left-4 w-[56px] h-[56px] rounded-2xl overflow-hidden border-[3px] border-white shadow-lg">
          <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
        </div>
        {/* Heart */}
        <button className="absolute bottom-2 right-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Store Info */}
      <div className="pt-8 px-4 pb-4 bg-white">
        <h1 className="font-black text-gray-900 text-xl">{store.name}</h1>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Rating value={store.rating} count={store.reviewCount} size="md" />
          <span className="text-muted text-sm">·</span>
          <span className={`text-sm font-semibold ${store.isOpen ? 'text-success' : 'text-muted'}`}>
            {store.isOpen ? `Open until ${store.openUntil ?? '10 PM'}` : 'Closed'}
          </span>
        </div>

        {/* Category tags */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {store.tags.map(tag => (
            <span key={tag} className="text-xs bg-surface text-gray-600 border border-border px-2 py-0.5 rounded-chip font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Address */}
        {store.address && (
          <div className="flex items-start gap-1.5 mt-3">
            <MapPin className="w-3.5 h-3.5 text-muted mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted">{store.address}{store.distanceKm ? ` · ${store.distanceKm}km away` : ''}</p>
          </div>
        )}

        {/* Delivery stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
          {[
            { icon: Clock, label: 'DELIVERY', value: store.deliveryTime },
            { icon: ShoppingBag, label: 'MIN ORDER', value: formatCurrency(store.minimumOrder) },
            { icon: null, label: 'FEE', value: store.deliveryFee === 0 ? 'FREE' : formatCurrency(store.deliveryFee) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">{label}</span>
              <span className={`text-sm font-bold ${label === 'FEE' && store.deliveryFee === 0 ? 'text-success' : 'text-gray-900'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Categories */}
      {categories.length > 0 && (
        <div className="px-4 py-3 bg-white border-t border-border scroll-row">
          <Chip
            label="All"
            selected={!selectedCategory}
            onClick={() => setSelectedCategory(undefined)}
          />
          {categories.map(cat => (
            <Chip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="px-4 py-4">
        {productsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-card overflow-hidden shadow-card">
                <Skeleton shape="card" height="120px" className="rounded-none" />
                <div className="p-2.5 flex flex-col gap-1.5">
                  <Skeleton shape="line" height="14px" />
                  <Skeleton shape="line" height="12px" width="50%" />
                  <Skeleton shape="line" height="16px" width="40%" />
                </div>
              </div>
            ))}
          </div>
        ) : (products?.length ?? 0) === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📦</div>
            <p className="font-semibold text-gray-700">No products in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {(products ?? []).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                variant="grid"
                storeName={store.name}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
