// src/pages/Profile/Profile.tsx
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Package, User, LogOut, HelpCircle, Bell, Shield } from 'lucide-react';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { Avatar } from '../../components/atoms/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  badge?: string;
}

export function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate(ROUTES.login);
  };

  const menuItems: MenuItem[][] = [
    [
      { icon: Package,  label: 'My Orders',   onClick: () => navigate(ROUTES.orders) },
      { icon: MapPin,   label: 'My Addresses', onClick: () => navigate(ROUTES.addresses) },
    ],
    [
      { icon: Bell,     label: 'Notifications',   onClick: () => navigate(ROUTES.comingSoon) },
      { icon: Shield,   label: 'Privacy Policy',  onClick: () => navigate(ROUTES.comingSoon) },
      { icon: HelpCircle, label: 'Help & Support', onClick: () => navigate(ROUTES.comingSoon) },
    ],
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-border">
        <h1 className="font-black text-gray-900 text-xl mb-4">Profile</h1>
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <Avatar src={user.avatarUrl} name={user.name} size="xl" />
            <div>
              <p className="font-bold text-gray-900 text-lg">{user.name}</p>
              <p className="text-muted text-sm">+91 {user.phone.replace('+91', '')}</p>
              {user.email && <p className="text-xs text-muted">{user.email}</p>}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-muted" />
            </div>
            <div>
              <button
                onClick={() => navigate(ROUTES.login)}
                className="font-bold text-primary text-lg"
              >
                Login / Sign up
              </button>
              <p className="text-muted text-sm">Access orders, addresses and more</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="px-4 py-4 flex flex-col gap-4">
        {menuItems.map((group, gi) => (
          <div key={gi} className="bg-white rounded-card shadow-card overflow-hidden">
            {group.map(({ icon: Icon, label, onClick, badge }, mi) => (
              <button
                key={label}
                onClick={onClick}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface transition-colors ${
                  mi < group.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-sm font-medium text-gray-800">{label}</span>
                {badge && (
                  <span className="text-[10px] bg-secondary text-white font-bold px-2 py-0.5 rounded-chip">{badge}</span>
                )}
                <ChevronRight className="w-4 h-4 text-muted" />
              </button>
            ))}
          </div>
        ))}

        {/* Logout */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-card shadow-card text-danger w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        )}

        <p className="text-center text-xs text-muted mt-4">AVS Client Portal · v1.0.0</p>
      </div>
    </PageWrapper>
  );
}
