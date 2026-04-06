// src/components/organisms/BottomNav/BottomNav.tsx
import { Home, Compass, ShoppingBag, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { useAppSelector } from '../../../store';
import { ROUTES } from '../../../constants/routes';

const NAV_ITEMS = [
  { label: 'Home',    icon: Home,        to: ROUTES.home },
  { label: 'Explore', icon: Compass,     to: ROUTES.explore },
  { label: 'Orders',  icon: ShoppingBag, to: ROUTES.orders },
  { label: 'Profile', icon: User,        to: ROUTES.profile },
] as const;

export function BottomNav() {
  const location = useLocation();
  const activeOrders = useAppSelector((s) =>
    s.cart.items.length > 0 ? 1 : 0,
  );

  return (
    <nav className="sticky bottom-0 bg-white border-t border-border z-30 bottom-nav-safe">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
          const showBadge = label === 'Orders' && activeOrders > 0;

          return (
            <NavLink
              key={label}
              to={to}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 relative',
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isActive ? 'text-primary' : 'text-muted',
                    isActive ? 'fill-primary/10' : '',
                  )}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {activeOrders}
                  </span>
                )}
              </div>
              <span className={cn(
                'text-[10px] font-semibold tracking-wide',
                isActive ? 'text-primary' : 'text-muted',
              )}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
