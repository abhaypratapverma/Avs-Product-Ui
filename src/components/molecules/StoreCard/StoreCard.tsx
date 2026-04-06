import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Truck } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/atoms/Badge';
import { Rating } from '@/components/atoms/Rating';
import type { Store } from '@/types/store.types';
import { storeDetailPath } from '@/constants/routes';
import { formatCurrencyShort } from '@/utils/formatCurrency';

type StoreCardVariant = 'full' | 'compact' | 'horizontal';

interface StoreCardProps {
  data: Store;
  variant?: StoreCardVariant;
  onPress?: () => void;
  className?: string;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  data,
  variant = 'full',
  onPress,
  className,
}) => {
  const navigate = useNavigate();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigate(storeDetailPath(data.id));
    }
  };

  if (variant === 'horizontal') {
    return (
      <button
        onClick={handlePress}
        className={cn(
          'flex items-center gap-3 bg-white rounded-2xl p-3 shadow-card active:scale-[0.98] transition-transform w-full text-left',
          className
        )}
      >
        <img
          src={data.logoUrl || '/placeholder-store.png'}
          alt={data.name}
          className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-textPrimary text-sm truncate">{data.name}</h3>
            {!data.isOpen && <Badge variant="closed">Closed</Badge>}
          </div>
          <Rating value={data.rating} count={data.reviewCount} />
          <div className="flex items-center gap-3 mt-1 text-xs text-textSecondary">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {data.deliveryTime}
            </span>
            <span className="flex items-center gap-1">
              <Truck size={11} />
              {data.deliveryFee === 0 ? 'Free delivery' : formatCurrencyShort(data.deliveryFee)}
            </span>
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handlePress}
        className={cn(
          'flex flex-col items-center gap-2 active:scale-[0.97] transition-transform',
          className
        )}
      >
        <div className="relative">
          <img
            src={data.logoUrl || '/placeholder-store.png'}
            alt={data.name}
            className="w-20 h-20 rounded-2xl object-cover bg-gray-100 shadow-card"
          />
          {!data.isOpen && (
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">Closed</span>
            </div>
          )}
        </div>
        <span className="text-xs font-medium text-textPrimary text-center max-w-[80px] truncate">
          {data.name}
        </span>
      </button>
    );
  }

  // Full variant (default)
  return (
    <button
      onClick={handlePress}
      className={cn(
        'bg-white rounded-2xl overflow-hidden shadow-card active:scale-[0.99] transition-transform w-full text-left',
        className
      )}
    >
      {/* Banner */}
      <div className="relative w-full h-36 bg-gray-100 overflow-hidden">
        <img
          src={data.bannerUrl || data.logoUrl || '/placeholder-banner.png'}
          alt={`${data.name} banner`}
          className="w-full h-full object-cover"
        />
        {/* Overlaid badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {data.isSponsored && <Badge variant="sponsored">Sponsored</Badge>}
          {data.isFeatured && <Badge variant="featured">Featured</Badge>}
        </div>
        {!data.isOpen && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="closed" className="text-sm px-3 py-1">Currently Closed</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex gap-3">
        <img
          src={data.logoUrl || '/placeholder-store.png'}
          alt={data.name}
          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-gray-100 border border-border"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-textPrimary text-sm truncate mb-0.5">
            {data.name}
          </h3>
          <Rating value={data.rating} count={data.reviewCount} />
          <div className="flex items-center gap-3 mt-1 text-xs text-textSecondary">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {data.deliveryTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck size={11} />
              {data.deliveryFee === 0 ? 'Free delivery' : formatCurrencyShort(data.deliveryFee)}
            </span>
            {data.minOrderAmount > 0 && (
              <>
                <span>•</span>
                <span>Min {formatCurrencyShort(data.minOrderAmount)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
