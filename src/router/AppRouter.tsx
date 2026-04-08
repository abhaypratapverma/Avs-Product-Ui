// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { AppLayout }      from '../components/layouts/AppLayout';
import { withLocation }   from '../hoc/withLocation';
import { withAuth }       from '../hoc/withAuth';
import { withGuestAccess } from '../hoc/withGuestAccess';
import { useAuth }        from '../hooks/useAuth';

// Onboarding
import { LocationSetup }     from '../pages/Onboarding/LocationSetup';
import { Login }             from '../pages/Onboarding/Login';
import { Register }          from '../pages/Onboarding/Register';
import { ProfileSetup }      from '../pages/Onboarding/ProfileSetup';

// Main pages
import { Home }              from '../pages/Home/Home';
import { Explore }           from '../pages/Explore/Explore';
import { Search }            from '../pages/Search/Search';
import { StoreDetail }       from '../pages/StoreDetail/StoreDetail';
import { Cart }              from '../pages/Cart/Cart';
import { OrderConfirmation } from '../pages/OrderConfirmation/OrderConfirmation';
import { Orders }            from '../pages/Orders/Orders';
import { OrderDetail }       from '../pages/Orders/OrderDetail';
import { Profile }           from '../pages/Profile/Profile';
import { Addresses }         from '../pages/Addresses/Addresses';
import { ComingSoon }        from '../pages/ComingSoon/ComingSoon';
import { ROUTES }            from '../constants/routes';

// HOC compositions — applied here, NOT in page files
const ProtectedHome       = withLocation(withGuestAccess(Home));
const ProtectedExplore    = withLocation(withGuestAccess(Explore));
const ProtectedSearch     = withLocation(withGuestAccess(Search));
const ProtectedStoreDetail = withLocation(withGuestAccess(StoreDetail));
const ProtectedCart       = withLocation(withGuestAccess(Cart));
const ProtectedOrders     = withAuth(Orders);
const ProtectedOrderDetail = withAuth(OrderDetail);
const ProtectedProfile    = Profile;
const ProtectedAddresses  = withAuth(Addresses);

export function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ── ONBOARDING (no layout) ── */}
        <Route path={ROUTES.locationSetup} element={<LocationSetup />} />
        <Route path={ROUTES.login}         element={<Login />} />
        <Route path={ROUTES.register}      element={<Register />} />
        <Route path={ROUTES.profileSetup}  element={<ProfileSetup />} />

        <Route path="/" element={<Navigate to={ROUTES.home} replace />} />

        {/* ── MAIN APP (with layout) ── */}
        <Route element={<AppLayout />}>
          <Route path={ROUTES.home}              element={<ProtectedHome />} />
          <Route path={ROUTES.explore}           element={<ProtectedExplore />} />
          <Route path={ROUTES.search}            element={<ProtectedSearch />} />
          <Route path={ROUTES.storeDetail}       element={<ProtectedStoreDetail />} />
          <Route path={ROUTES.cart}              element={<ProtectedCart />} />
          <Route path={ROUTES.orderConfirmation} element={<OrderConfirmation />} />
          <Route path={ROUTES.orders}            element={<ProtectedOrders />} />
          <Route path={ROUTES.orderDetail}       element={<ProtectedOrderDetail />} />
          <Route path={ROUTES.profile}           element={<ProtectedProfile />} />
          <Route path={ROUTES.addresses}         element={<ProtectedAddresses />} />
          <Route path={ROUTES.comingSoon}        element={<ComingSoon />} />
        </Route>

        {/* ── FALLBACK ── */}
        <Route path="*" element={<FallbackRoute />} />
      </Routes>
    </AnimatePresence>
  );
}

function FallbackRoute() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? ROUTES.home : ROUTES.login} replace />;
}
