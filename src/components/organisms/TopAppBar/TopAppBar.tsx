import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useLocationStore } from '@/store/locationStore';
import { useCartStore } from '@/store/cartStore';
import { ROUTES } from '@/constants/routes';

export const TopAppBar: React.FC = () => {
  const navigate = useNavigate();
  const { districtLabel } = useLocationStore();
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-mobile mx-auto">
        {/* Location */}
        <button
          onClick={() => navigate(ROUTES.LOCATION_SETUP)}
          className="flex items-center gap-1.5 active:opacity-70 transition-opacity min-w-0 flex-1"
          id="location-selector-btn"
        >
          <MapPin size={18} className="text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-textSecondary font-medium">Delivering to</p>
            <div className="flex items-center gap-1">
              <span className="font-bold text-textPrimary text-sm truncate max-w-[150px]">
                {districtLabel || 'Select Location'}
              </span>
              <ChevronDown size={14} className="text-primary shrink-0" />
            </div>
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(ROUTES.SEARCH)}
            id="search-btn"
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Search size={18} className="text-textSecondary" />
          </button>

          <button
            onClick={() => navigate(ROUTES.CART)}
            id="cart-btn"
            className="relative w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <ShoppingCart size={18} className="text-textSecondary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
