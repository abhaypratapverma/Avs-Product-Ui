// src/components/layouts/AppLayout.tsx
import { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Search, MapPin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { TopAppBar } from '../organisms/TopAppBar';
import { BottomNav } from '../organisms/BottomNav';
import { CartPreviewBar } from '../organisms/CartPreviewBar';
import { ConfirmModal } from '../common/ConfirmModal';
import { BottomSheet } from '../common/BottomSheet';
import { useCart } from '../../hooks/useCart';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { useLocation as useAppLocation } from '../../hooks/useLocation';
import { useGetAddressesQuery } from '../../api/services/addressApi';
import { useLazyGetShopsQuery } from '../../api/services/homeApi';
import { useAuth } from '../../hooks/useAuth';

export function AppLayout() {
  const { pendingItem, confirmReplaceCart, cancelReplaceCart } = useCart();
  const locationSheet = useBottomSheet();
  const { districtLabel, changeLocation } = useAppLocation();
  const { isAuthenticated } = useAuth();
  
  const { data: addresses } = useGetAddressesQuery(undefined, { skip: !isAuthenticated });
  const [getShops, { isFetching: isSearching }] = useLazyGetShopsQuery();
  const [searchCode, setSearchCode] = useState('');

  const uniqueAddressLocations = useMemo(() => {
    if (!addresses) return [];
    const map = new Map<string, { code: string; label: string; type: string }>();
    addresses.forEach(a => {
      const code = a.pincode || a.district || a.city;
      if (code && !map.has(code)) {
        map.set(code, { code, label: `${a.city}, ${a.state}`, type: a.type });
      }
    });
    return Array.from(map.values());
  }, [addresses]);

  const handleSetLucknow = () => {
    changeLocation('226001', 'Lucknow, Uttar Pradesh', { lat: 26.8467, lng: 80.9462 });
    locationSheet.close();
  };

  const handleSelectDistrict = (code: string, label: string) => {
    changeLocation(code, label);
    locationSheet.close();
  };

  const handleSearchCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = searchCode.trim();
    if (!code) return;
    try {
      const res = await getShops(code).unwrap();
      if (res && res.length > 0) {
        changeLocation(code, `${code.toUpperCase()} (Searched)`);
        locationSheet.close();
        setSearchCode('');
        toast.success('Location updated!');
      } else {
        toast.error('No stores available in this district yet.');
      }
    } catch {
      toast.error('Failed to search district code.');
    }
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
        <div className="p-4 flex flex-col gap-4">
          <p className="text-sm text-slate-500">Currently showing stores in <strong className="text-gray-900">{districtLabel ?? 'no location set'}</strong></p>
          
          <form onSubmit={handleSearchCode} className="relative flex items-center mb-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search by District Code manually..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-9 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button
              type="submit"
              disabled={!searchCode.trim() || isSearching}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-primary text-white text-xs font-bold rounded-lg disabled:opacity-50 flex items-center justify-center min-w-[60px]"
            >
              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
            </button>
          </form>

          {uniqueAddressLocations.length > 0 && (
            <>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">From Your Addresses</p>
              <div className="flex flex-col gap-2">
                {uniqueAddressLocations.map(loc => (
                  <button
                    key={loc.code}
                    onClick={() => handleSelectDistrict(loc.code, loc.label)}
                    className="flex items-center gap-3 py-3 px-4 bg-white rounded-xl hover:bg-slate-50 transition-colors text-left border border-slate-100 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm capitalize">{loc.type} ({loc.code})</p>
                      <p className="text-xs text-slate-500">{loc.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="h-px bg-slate-100 my-1" />
          
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Available Districts (Phase 1)</p>
          <button
            onClick={handleSetLucknow}
            className="flex items-center gap-3 py-3 px-4 bg-white rounded-xl hover:bg-slate-50 transition-colors text-left border border-slate-100 shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Lucknow</p>
              <p className="text-xs text-slate-500">Uttar Pradesh</p>
            </div>
          </button>
          <p className="text-[11px] text-slate-400 text-center mt-2 font-medium">More districts coming soon</p>
        </div>
      </BottomSheet>
    </div>
  );
}
