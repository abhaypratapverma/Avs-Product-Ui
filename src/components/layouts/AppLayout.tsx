// src/components/layouts/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import { TopAppBar } from '../organisms/TopAppBar';
import { BottomNav } from '../organisms/BottomNav';
import { CartPreviewBar } from '../organisms/CartPreviewBar';
import { ConfirmModal } from '../common/ConfirmModal';
import { BottomSheet } from '../common/BottomSheet';
import { useCart } from '../../hooks/useCart';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { useLocation as useAppLocation } from '../../hooks/useLocation';

export function AppLayout() {
  const { pendingItem, confirmReplaceCart, cancelReplaceCart } = useCart();
  const locationSheet = useBottomSheet();
  const { districtLabel, changeLocation } = useAppLocation();

  const handleSetLucknow = () => {
    changeLocation('226001', 'Lucknow, UP', { lat: 26.8467, lng: 80.9462 });
    locationSheet.close();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <TopAppBar onLocationClick={locationSheet.open} />

      {/* Page Content */}
      <main className="flex-1 pb-[140px]">
        <Outlet />
      </main>

      {/* Fixed overlays */}
      <CartPreviewBar />
      <BottomNav />

      {/* Cross-store cart replacement modal */}
      <ConfirmModal
        isOpen={!!pendingItem}
        title="Replace Cart?"
        message={`Your cart has items from "${pendingItem ? 'another store' : ''}". Adding items from ${pendingItem?.storeName ?? 'this store'} will clear the current cart.`}
        confirmLabel="Replace Cart"
        cancelLabel="Keep Current"
        onConfirm={confirmReplaceCart}
        onCancel={cancelReplaceCart}
        danger
      />

      {/* Change Location Bottom Sheet */}
      <BottomSheet
        isOpen={locationSheet.isOpen}
        onClose={locationSheet.close}
        title="Your Location"
      >
        <div className="p-4 flex flex-col gap-3">
          <p className="text-sm text-muted">Currently showing stores in <strong className="text-gray-900">{districtLabel ?? 'no location set'}</strong></p>
          <div className="h-px bg-border" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Available Districts (Phase 1)</p>
          <button
            onClick={handleSetLucknow}
            className="flex items-center gap-3 py-3 px-4 bg-surface rounded-xl hover:bg-blue-50 transition-colors text-left border border-border"
          >
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Lucknow</p>
              <p className="text-xs text-muted">Uttar Pradesh</p>
            </div>
          </button>
          <p className="text-xs text-muted text-center mt-2">More districts coming soon</p>
        </div>
      </BottomSheet>
    </div>
  );
}
