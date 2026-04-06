import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingBag, LogOut, ChevronRight, Bell } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { Avatar } from '@/components/atoms/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { withAuth } from '@/hoc/withAuth';
import { ROUTES } from '@/constants/routes';

interface ProfileLinkProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  id: string;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ icon, label, onClick, id }) => (
  <button
    id={id}
    onClick={onClick}
    className="flex items-center gap-3 w-full p-4 bg-white rounded-2xl shadow-card active:scale-[0.99] transition-transform"
  >
    <span className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
      {icon}
    </span>
    <span className="flex-1 text-left font-medium text-textPrimary text-sm">{label}</span>
    <ChevronRight size={16} className="text-textSecondary" />
  </button>
);

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <PageWrapper>
      <div className="px-4 pt-4 pb-8 space-y-6">
        {/* User card */}
        <div className="bg-gradient-to-br from-primary to-primary-700 rounded-3xl p-6 text-white shadow-elevated">
          <div className="flex items-center gap-4">
            <Avatar name={user?.name || 'User'} src={user?.avatarUrl} size="lg" />
            <div>
              <h1 className="font-bold text-xl">{user?.name || 'AVS User'}</h1>
              <p className="text-primary-100 text-sm">{user?.phone}</p>
              {user?.email && (
                <p className="text-primary-100 text-xs mt-0.5">{user.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <ProfileLink
            id="profile-addresses-link"
            icon={<MapPin size={18} />}
            label="My Addresses"
            onClick={() => navigate(ROUTES.ADDRESSES)}
          />
          <ProfileLink
            id="profile-orders-link"
            icon={<ShoppingBag size={18} />}
            label="My Orders"
            onClick={() => navigate(ROUTES.ORDERS)}
          />
          <ProfileLink
            id="profile-notifications-link"
            icon={<Bell size={18} />}
            label="Notifications"
            onClick={() => navigate(ROUTES.COMING_SOON)}
          />
          <ProfileLink
            id="profile-edit-link"
            icon={<User size={18} />}
            label="Edit Profile"
            onClick={() => navigate(ROUTES.PROFILE_SETUP)}
          />
        </div>

        {/* Logout */}
        <button
          id="logout-btn"
          onClick={logout}
          className="flex items-center gap-3 w-full p-4 bg-red-50 rounded-2xl active:scale-[0.99] transition-transform"
        >
          <span className="w-9 h-9 rounded-xl bg-red-100 text-error flex items-center justify-center">
            <LogOut size={18} />
          </span>
          <span className="font-medium text-error text-sm">Logout</span>
        </button>
      </div>
    </PageWrapper>
  );
};

export default withAuth(ProfilePage);
