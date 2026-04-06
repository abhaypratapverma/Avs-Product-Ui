// src/components/organisms/TopAppBar/TopAppBar.tsx
import { Bell, ShoppingBag, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { useAppSelector } from '../../../store';
import { ROUTES } from '../../../constants/routes';

interface TopAppBarProps {
  onLocationClick?: () => void;
  className?: string;
}

export function TopAppBar({ onLocationClick, className }: TopAppBarProps) {
  const navigate = useNavigate();
  const districtLabel = useAppSelector((s) => s.location.districtLabel);
  const cartTotal = useAppSelector((s) => s.cart.totalItems);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border',
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        {/* Logo */}
        <span className="font-black text-primary text-xl tracking-wide flex-shrink-0">AVS</span>

        {/* Location pill */}
        <button
          onClick={onLocationClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-surface rounded-pill border border-border hover:border-primary/30 transition-colors max-w-[200px]"
        >
          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="text-xs font-semibold text-gray-800 truncate">
            {districtLabel ?? 'Set location'}
          </span>
          <ChevronDown className="w-3 h-3 text-muted flex-shrink-0" />
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notification */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          </button>
          {/* Cart */}
          <button
            onClick={() => navigate(ROUTES.cart)}
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-gray-600" />
            {cartTotal > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {cartTotal}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
