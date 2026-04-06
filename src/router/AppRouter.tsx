import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { getMe } from '@/api/services/auth.service';
import { AppLayout } from '@/components/layouts/AppLayout';
import { ROUTES } from '@/constants/routes';

// Lazy page imports for code splitting
import LocationSetup from '@/pages/Onboarding/LocationSetup';
import Login from '@/pages/Onboarding/Login';
import ProfileSetup from '@/pages/Onboarding/ProfileSetup';
import Home from '@/pages/Home/Home';
import Explore from '@/pages/Explore/Explore';
import Search from '@/pages/Search/Search';
import StoreDetail from '@/pages/StoreDetail/StoreDetail';
import Cart from '@/pages/Cart/Cart';
import OrderConfirmation from '@/pages/OrderConfirmation/OrderConfirmation';
import Orders from '@/pages/Orders/Orders';
import Profile from '@/pages/Profile/Profile';
import Addresses from '@/pages/Addresses/Addresses';
import ComingSoon from '@/pages/ComingSoon/ComingSoon';

/**
 * Validates the stored token on app boot by hitting /auth/me.
 * If it fails, clears auth silently so user continues as guest.
 */
function useBootAuth() {
  const { accessToken, setAuth, clearAuth, updateUser } = useAuthStore();
  const _setAuth = setAuth;
  const _clearAuth = clearAuth;
  const _updateUser = updateUser;

  useEffect(() => {
    if (!accessToken) return;

    getMe()
      .then((user) => {
        _updateUser(user);
      })
      .catch(() => {
        // Token invalid — clear auth, continue as guest
        _clearAuth();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount
}

export function AppRouter() {
  useBootAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ── Public routes ────────────────────────────────── */}
        <Route path={ROUTES.LOCATION_SETUP} element={<LocationSetup />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.PROFILE_SETUP} element={<ProfileSetup />} />

        {/* ── App routes (with layout) ─────────────────────── */}
        <Route element={<AppLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.EXPLORE} element={<Explore />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.STORE_DETAIL} element={<StoreDetail />} />
          <Route path={ROUTES.COMING_SOON} element={<ComingSoon />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmation />} />
          <Route path={ROUTES.ORDERS} element={<Orders />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.ADDRESSES} element={<Addresses />} />
        </Route>

        {/* ── Catch-all ───────────────────────────────────── */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </AnimatePresence>
  );
}
