// src/components/molecules/StoreCard/StoreCard.tsx
import { Heart, Clock, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { Badge } from '../../atoms/Badge';
import { Rating } from '../../atoms/Rating';
import { formatCurrency } from '../../../utils/formatCurrency';
import type { Store } from '../../../types/store.types';

type StoreCardVariant = 'full' | 'compact' | 'horizontal';

interface StoreCardProps {
  store: Store;
  variant?: StoreCardVariant;
  className?: string;
}

export function StoreCard({ store, variant = 'full', className }: StoreCardProps) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/stores/${store.id}`);

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={cn('flex flex-col items-center gap-2 w-[90px] flex-shrink-0', className)}
      >
        <div className="relative w-16 h-16 rounded-[18px] overflow-hidden ring-2 ring-border flex-shrink-0">
          <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
          {!store.isOpen && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">Closed</span>
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">{store.name}</p>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <Rating value={store.rating} size="sm" />
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'horizontal') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center gap-3 bg-white rounded-card p-3 w-full text-left shadow-card hover:shadow-card-hover transition-shadow',
          className,
        )}
      >
        <div className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0">
          <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{store.name}</p>
          <p className="text-xs text-muted truncate">{store.category} · {store.city}</p>
          <div className="flex items-center gap-2 mt-1">
            <Rating value={store.rating} size="sm" />
            <span className="text-xs text-muted flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> {store.deliveryTime}
            </span>
          </div>
        </div>
        <Badge variant={store.isOpen ? 'open' : 'closed'} />
      </button>
    );
  }

  // FULL VARIANT — most used
  return (
    <button
      onClick={handleClick}
      className={cn(
        'bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 text-left w-full active:scale-[0.99]',
        className,
      )}
    >
      {/* Banner */}
      <div className="relative w-full h-[140px] overflow-hidden">
        <img
          src={store.bannerUrl}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        {/* Store Logo */}
        <div className="absolute -bottom-4 left-3 w-[44px] h-[44px] rounded-xl overflow-hidden border-2 border-white shadow-md">
          <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
        </div>
        {/* Open/Closed Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant={store.isOpen ? 'open' : 'closed'} />
        </div>
        {/* Heart */}
        <div
          role="button"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform cursor-pointer"
        >
          <Heart className="w-4 h-4 text-gray-500" />
        </div>
        {/* Sponsored/Featured badges */}
        {store.isSponsored && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="sponsored" />
          </div>
        )}
        {store.isFeatured && !store.isSponsored && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="featured" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-6 pb-3 px-3">
        <h3 className="font-bold text-gray-900 text-base leading-tight">{store.name}</h3>
        <p className="text-xs text-muted mt-0.5">{store.category} · {store.city}</p>

        {/* Rating row */}
        <div className="flex items-center gap-3 mt-2">
          <Rating value={store.rating} count={store.reviewCount} />
        </div>

        {/* Delivery row */}
        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-muted" />
            {store.deliveryTime}
          </span>
          <span className="text-muted">·</span>
          <span className="flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-muted" />
            {formatCurrency(store.minimumOrder)} min
          </span>
          <span className="text-muted">·</span>
          <span className={store.deliveryFee === 0 ? 'text-success font-semibold' : ''}>
            {store.deliveryFee === 0 ? 'FREE delivery' : `${formatCurrency(store.deliveryFee)} delivery`}
          </span>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <Badge variant="cod" />
          {store.isFeatured && <Badge variant="featured" />}
        </div>
      </div>
    </button>
  );
}
