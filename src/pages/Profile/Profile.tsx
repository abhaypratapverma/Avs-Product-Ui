// src/pages/Profile/Profile.tsx
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  Bell,
  Heart,
  Star,
  Ticket,
  HelpCircle,
  MessageCircle,
  FileText,
  ChevronRight,
  Store,
  Pencil,
  ArrowRight
} from 'lucide-react';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { Avatar } from '../../components/atoms/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { useLogoutMutation } from '../../api/services/authApi';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

export function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshToken, logout } = useAuth();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutApi({ refreshToken }).unwrap();
      }
    } catch {
      // Proceed to logout locally even if API fails
    }
    logout();
    toast.success('Logged out successfully');
    navigate(ROUTES.login);
  };

  return (
    <PageWrapper className="bg-[#f4f7fb] min-h-screen pb-24 font-sans relative">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6 text-primary fill-primary" />
          <h1 className="font-black text-primary text-xl tracking-wide uppercase">AVS</h1>
        </div>
        <Bell className="w-5 h-5 text-slate-500 fill-slate-500" />
      </div>

      {/* Profile Info */}
      {isAuthenticated && user ? (
        <div className="flex items-center gap-5 px-6 py-4">
          <div className="relative">
            <Avatar src={user.avatarUrl} name={user.name} size="xl" className="w-[84px] h-[84px] shadow-sm border-2 border-white" />
            <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white cursor-pointer hover:bg-blue-700 transition">
              <Pencil className="w-[14px] h-[14px] fill-current" />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-[20px] font-bold text-gray-900 leading-snug">{user.name}</h2>
            <p className="text-slate-500 text-[13px] font-semibold tracking-wide">{user.phone}</p>
            <button className="text-primary text-[11px] font-bold mt-1.5 tracking-wider text-left uppercase w-max hover:underline">
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5 px-6 py-4">
           {/* Not logged in placeholder */}
           <div className="w-[84px] h-[84px] bg-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
             <Store className="w-10 h-10 text-slate-300" />
           </div>
           <div className="flex-col">
             <button
               onClick={() => navigate(ROUTES.login)}
               className="font-bold text-primary text-xl"
             >
               Login / Sign up
             </button>
             <p className="text-slate-500 text-sm font-medium mt-1">Access orders, addresses and more</p>
           </div>
        </div>
      )}

      {/* MY ACCOUNT */}
      <div className="mt-6 px-4">
        <h3 className="text-[11px] font-bold text-[#6a84c9] mb-3 px-3 tracking-widest uppercase">My Account</h3>
        <div className="bg-[#f0f4f9] rounded-[24px] p-2 shadow-sm border border-white/50">
           {/* Saved Addresses */}
           <button onClick={() => navigate(ROUTES.addresses)} className="w-full flex items-center gap-4 p-3 hover:bg-black/5 rounded-[20px] transition-colors group">
             <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center">
               <MapPin className="w-[22px] h-[22px] text-primary" strokeWidth={2.5} />
             </div>
             <div className="flex-1 text-left">
               <div className="text-[15px] font-semibold text-gray-900">Saved Addresses</div>
               <div className="text-[12px] text-slate-500 font-medium">Manage your delivery locations</div>
             </div>
             <ChevronRight className="w-[18px] h-[18px] text-slate-300 group-hover:text-slate-500 transition-colors" strokeWidth={3} />
           </button>

           {/* Payment Methods */}
           <button onClick={() => navigate(ROUTES.comingSoon)} className="w-full flex items-center gap-4 p-3 hover:bg-black/5 rounded-[20px] transition-colors group">
             <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center">
               <CreditCard className="w-[22px] h-[22px] text-primary" strokeWidth={2.5} />
             </div>
             <div className="flex-1 text-left">
               <div className="text-[15px] font-semibold text-gray-900">Payment Methods</div>
               <div className="text-[12px] text-slate-500 font-medium">Cards, UPI, and Digital Wallets</div>
             </div>
             <ChevronRight className="w-[18px] h-[18px] text-slate-300 group-hover:text-slate-500 transition-colors" strokeWidth={3} />
           </button>

           {/* Notifications */}
           <button onClick={() => navigate(ROUTES.comingSoon)} className="w-full flex items-center gap-4 p-3 hover:bg-black/5 rounded-[20px] transition-colors group">
             <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center relative">
               <Bell className="w-[22px] h-[22px] text-primary" strokeWidth={2.5} />
             </div>
             <div className="flex-1 text-left">
               <div className="text-[15px] font-semibold text-gray-900">Notifications</div>
               <div className="text-[12px] text-slate-500 font-medium">Preferences and Alerts</div>
             </div>
             <ChevronRight className="w-[18px] h-[18px] text-slate-300 group-hover:text-slate-500 transition-colors" strokeWidth={3} />
           </button>
        </div>
      </div>

      {/* MY ACTIVITY */}
      <div className="mt-8 px-4">
        <h3 className="text-[11px] font-bold text-[#6a84c9] mb-3 px-3 tracking-widest uppercase">My Activity</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Saved Stores */}
          <button onClick={() => navigate(ROUTES.comingSoon)} className="bg-white rounded-[20px] p-5 flex flex-col justify-center items-start shadow-sm border border-slate-100/50 overflow-hidden relative group hover:shadow-md transition-shadow">
            <Heart className="w-[26px] h-[26px] text-[#b34015] fill-[#b34015] mb-4" />
            <div className="text-[15px] font-bold text-gray-900 mb-1 z-10 w-full text-left">Saved Stores</div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10 w-full text-left">12 Bookmarked</div>
          </button>
          
          {/* My Reviews */}
          <button onClick={() => navigate(ROUTES.comingSoon)} className="bg-white rounded-[20px] p-5 flex flex-col justify-center items-start shadow-sm border border-slate-100/50 overflow-hidden relative group hover:shadow-md transition-shadow">
            <Star className="w-[26px] h-[26px] text-[#006e33] fill-[#006e33] mb-4" />
            <div className="text-[15px] font-bold text-gray-900 mb-1 z-10 w-full text-left">My Reviews</div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10 w-full text-left">8 Reviews Left</div>
          </button>
        </div>

        {/* Coupons */}
        <button onClick={() => navigate(ROUTES.comingSoon)} className="w-full bg-[#1855e3] rounded-[20px] p-4 flex items-center gap-4 text-white shadow-md relative overflow-hidden group hover:bg-blue-700 transition-colors">
          <div className="w-[44px] h-[44px] bg-white/10 rounded-xl flex items-center justify-center relative z-10 hidden sm:flex">
             <Ticket className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="w-[44px] h-[44px] bg-white/20 rounded-xl flex sm:hidden items-center justify-center relative z-10">
             <Ticket className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 text-left relative z-10">
            <div className="text-[16px] font-bold">Coupons</div>
            <div className="text-[12px] text-white/80 font-medium">4 Active discounts available</div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/90 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* SUPPORT */}
      <div className="mt-8 px-4">
        <h3 className="text-[11px] font-bold text-[#6a84c9] mb-3 px-3 tracking-widest uppercase">Support</h3>
        <div className="bg-[#f0f4f9] rounded-[24px] p-2 shadow-sm border border-white/50">
           <button onClick={() => navigate(ROUTES.comingSoon)} className="w-full flex items-center gap-4 p-3 hover:bg-black/5 rounded-[20px] transition-colors">
             <div className="w-8 h-8 flex items-center justify-center">
               {/* Fixed lucide-react icon colors */}
               <HelpCircle className="w-5 h-5 text-slate-600 fill-slate-200" />
             </div>
             <div className="flex-1 text-left text-[14px] font-medium text-gray-800">Help & FAQ</div>
           </button>

           <button onClick={() => navigate(ROUTES.comingSoon)} className="w-full flex items-center gap-4 p-3 hover:bg-black/5 rounded-[20px] transition-colors">
             <div className="w-8 h-8 flex items-center justify-center">
               <MessageCircle className="w-5 h-5 text-slate-600 fill-slate-200" />
             </div>
             <div className="flex-1 text-left text-[14px] font-medium text-gray-800">Contact</div>
           </button>

           <button onClick={() => navigate(ROUTES.comingSoon)} className="w-full flex items-center gap-4 p-3 hover:bg-black/5 rounded-[20px] transition-colors">
             <div className="w-8 h-8 flex items-center justify-center">
               <FileText className="w-5 h-5 text-slate-600" />
             </div>
             <div className="flex-1 text-left text-[14px] font-medium text-gray-800">Terms</div>
           </button>
        </div>
      </div>

      {/* LOGOUT & FOOTER */}
      <div className="mt-12 px-4 flex flex-col items-center">
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="w-full max-w-[320px] py-[14px] border border-[#f3dadd] text-[#d63f4b] bg-transparent rounded-full font-bold text-[11px] tracking-widest hover:bg-red-50 transition-colors mb-8 uppercase"
          >
            Logout
          </button>
        )}
        <div className="text-center font-bold text-slate-400 text-[10px] tracking-widest uppercase mb-1">
          AVS Local Ecosystem
        </div>
        <div className="text-center text-slate-300 text-[10px] mb-2">
          v2.4.12-release
        </div>
      </div>

    </PageWrapper>
  );
}
