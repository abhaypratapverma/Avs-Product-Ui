import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { useOrders } from '@/queries/useOrders';
import { useAuthStore } from '@/store/authStore';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  id: string;
}

const navItems: NavItem[] = [
  {
    to: ROUTES.HOME,
    label: 'Home',
    id: 'nav-home',
    icon: <Home size={22} strokeWidth={1.5} />,
    activeIcon: <Home size={22} strokeWidth={2.5} />,
  },
  {
    to: ROUTES.EXPLORE,
    label: 'Explore',
    id: 'nav-explore',
    icon: <Compass size={22} strokeWidth={1.5} />,
    activeIcon: <Compass size={22} strokeWidth={2.5} />,
  },
  {
    to: ROUTES.ORDERS,
    label: 'Orders',
    id: 'nav-orders',
    icon: <ShoppingBag size={22} strokeWidth={1.5} />,
    activeIcon: <ShoppingBag size={22} strokeWidth={2.5} />,
  },
  {
    to: ROUTES.PROFILE,
    label: 'Profile',
    id: 'nav-profile',
    icon: <User size={22} strokeWidth={1.5} />,
    activeIcon: <User size={22} strokeWidth={2.5} />,
  },
];

export const BottomNav: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: orders } = useOrders();

  const activeOrderCount = isAuthenticated
    ? orders?.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status)).length ?? 0
    : 0;

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-border shadow-bottom-nav z-40"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-2 py-1 pb-safe">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            id={item.id}
            end={item.to === ROUTES.HOME}
            className="flex flex-col items-center w-full py-1.5 relative group"
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'transition-colors duration-150',
                    isActive ? 'text-primary' : 'text-gray-400 group-active:text-primary'
                  )}
                >
                  {isActive ? item.activeIcon : item.icon}
                </span>

                {/* Active order badge on Orders tab */}
                {item.to === ROUTES.ORDERS && activeOrderCount > 0 && (
                  <span className="absolute top-1 left-1/2 translate-x-2 -translate-y-0.5 w-4 h-4 bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {activeOrderCount > 9 ? '9+' : activeOrderCount}
                  </span>
                )}

                <span
                  className={cn(
                    'text-[10px] mt-0.5 font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-gray-400'
                  )}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
