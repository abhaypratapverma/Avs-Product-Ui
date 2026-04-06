import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Truck, Star } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { ProductCard } from '@/components/molecules/ProductCard';
import { CartPreviewBar } from '@/components/organisms/CartPreviewBar';
import { Skeleton, StoreCardSkeleton } from '@/components/atoms/Skeleton';
import { Badge } from '@/components/atoms/Badge';
import { useStoreDetail } from '@/queries/useStoreDetail';
import { useProducts } from '@/queries/useProducts';
import { withLocation } from '@/hoc/withLocation';
import { withGuestAccess } from '@/hoc/withGuestAccess';
import { formatCurrencyShort } from '@/utils/formatCurrency';

const StoreDetailPage: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const id = parseInt(storeId ?? '0', 10);

  const { data: store, isLoading: storeLoading } = useStoreDetail(id);
  const { data: products, isLoading: productsLoading } = useProducts(id);

  if (storeLoading) {
    return (
      <PageWrapper>
        <div className="space-y-4">
          <Skeleton className="w-full h-52" rounded="sm" />
          <div className="px-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <StoreCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!store) return null;

  return (
    <PageWrapper>
      <div className="pb-32">
        {/* Hero image */}
        <div className="relative">
          <img
            src={store.bannerUrl || store.logoUrl || '/placeholder-banner.png'}
            alt={store.name}
            className="w-full h-52 object-cover"
          />
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center shadow-card"
          >
            <ArrowLeft size={18} className="text-textPrimary" />
          </button>
          {/* Store logo */}
          <div className="absolute -bottom-8 left-4">
            <img
              src={store.logoUrl || '/placeholder-store.png'}
              alt={store.name}
              className="w-16 h-16 rounded-2xl border-2 border-white shadow-card object-cover bg-white"
            />
          </div>
        </div>

        {/* Store info */}
        <div className="px-4 pt-12 pb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="font-black text-xl text-textPrimary">{store.name}</h1>
              {store.description && (
                <p className="text-sm text-textSecondary mt-0.5">{store.description}</p>
              )}
            </div>
            <Badge variant={store.isOpen ? 'open' : 'closed'}>
              {store.isOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-sm text-textSecondary">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-textPrimary">{store.rating}</span>
              <span>({store.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1 text-sm text-textSecondary">
              <Clock size={14} className="text-primary" />
              {store.deliveryTime}
            </span>
            <span className="flex items-center gap-1 text-sm text-textSecondary">
              <Truck size={14} className="text-primary" />
              {store.deliveryFee === 0
                ? 'Free delivery'
                : formatCurrencyShort(store.deliveryFee)}
            </span>
          </div>

          {store.minOrderAmount > 0 && (
            <p className="text-xs text-textSecondary mt-2">
              Min. order {formatCurrencyShort(store.minOrderAmount)}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-2 bg-background" />

        {/* Products */}
        <div className="px-4 pt-4">
          <h2 className="font-bold text-textPrimary text-base mb-3">Menu</h2>
          {productsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-24" rounded="lg" />
              ))}
            </div>
          ) : !products?.length ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-textSecondary text-sm">No products listed yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart preview bar */}
      <CartPreviewBar />
    </PageWrapper>
  );
};

export default withLocation(withGuestAccess(StoreDetailPage));
