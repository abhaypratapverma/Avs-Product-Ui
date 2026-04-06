import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { CartItem } from '@/components/molecules/CartItem';
import { BillSummary } from '@/components/molecules/BillSummary';
import { AddressCard } from '@/components/molecules/AddressCard';
import { Button } from '@/components/atoms/Button';
import { useCart } from '@/hooks/useCart';
import { useAddresses } from '@/queries/useAddresses';
import { placeOrder } from '@/api/services/order.service';
import { withAuth } from '@/hoc/withAuth';
import { withLocation } from '@/hoc/withLocation';
import { orderConfirmationPath, ROUTES } from '@/constants/routes';
import type { Address } from '@/types/order.types';
import toast from 'react-hot-toast';

// Store switch confirmation modal
function StoreSwitchModal({
  isOpen,
  newStoreName,
  currentStoreName,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  newStoreName?: string;
  currentStoreName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-3xl p-6 max-w-[320px] w-full">
        <div className="text-3xl mb-3 text-center">🛒</div>
        <h3 className="font-bold text-textPrimary text-lg text-center mb-2">Replace cart?</h3>
        <p className="text-sm text-textSecondary text-center mb-6">
          Your cart has items from <strong>{currentStoreName}</strong>.
          Adding from <strong>{newStoreName}</strong> will clear it.
        </p>
        <Button fullWidth onClick={onConfirm} className="mb-2">Yes, replace cart</Button>
        <Button fullWidth variant="ghost" onClick={onCancel}>Keep current cart</Button>
      </div>
    </div>
  );
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    storeId,
    storeName,
    totalAmount,
    clearCart,
    showStoreSwitchModal,
    confirmStoreSwitch,
    cancelStoreSwitch,
  } = useCart();

  const { data: addresses } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    addresses?.find((a) => a.isDefault)?.id ?? null
  );
  const [isPlacing, setIsPlacing] = useState(false);

  // Sync selected address when addresses load
  React.useEffect(() => {
    if (addresses && !selectedAddressId) {
      const def = addresses.find((a) => a.isDefault);
      if (def) setSelectedAddressId(def.id);
    }
  }, [addresses, selectedAddressId]);

  const DELIVERY_FEE = 0;
  const TAXES = Math.round(totalAmount * 0.05);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }
    if (!storeId || items.length === 0) return;

    setIsPlacing(true);
    try {
      const order = await placeOrder({
        addressId: selectedAddressId,
        storeId,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate(orderConfirmationPath(order.id), { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="text-xl font-bold text-textPrimary mb-2">Your cart is empty</h2>
          <p className="text-textSecondary text-sm mb-8">
            Add items from a local store to get started
          </p>
          <Button onClick={() => navigate(ROUTES.EXPLORE)} fullWidth size="lg">
            Explore Stores
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 pt-4 pb-32 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-bold text-textPrimary text-lg">Your Cart</h1>
          {storeName && (
            <span className="text-xs text-textSecondary ml-auto flex items-center gap-1">
              <ShoppingBag size={12} />
              {storeName}
            </span>
          )}
        </div>

        {/* Cart items */}
        <div className="space-y-3">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Bill */}
        <BillSummary
          subtotal={totalAmount}
          deliveryFee={DELIVERY_FEE}
          taxes={TAXES}
        />

        {/* Delivery address */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-textPrimary">Delivery Address</h2>
            <button
              onClick={() => navigate(ROUTES.ADDRESSES)}
              className="text-primary text-sm font-semibold"
            >
              Manage
            </button>
          </div>
          {!addresses?.length ? (
            <button
              onClick={() => navigate(ROUTES.ADDRESSES)}
              className="w-full border-2 border-dashed border-border rounded-2xl p-4 text-center text-primary text-sm font-medium"
            >
              + Add delivery address
            </button>
          ) : (
            <div className="space-y-2">
              {addresses.map((addr: Address) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  isSelected={selectedAddressId === addr.id}
                  onSelect={() => setSelectedAddressId(addr.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Place order CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile px-4 pb-6 bg-white border-t border-border pt-4">
        <Button
          fullWidth
          size="lg"
          onClick={handlePlaceOrder}
          isLoading={isPlacing}
          disabled={!selectedAddressId || isPlacing}
          id="place-order-btn"
        >
          Place Order • {totalAmount + DELIVERY_FEE + TAXES > 0
            ? `₹${(totalAmount + DELIVERY_FEE + TAXES).toLocaleString('en-IN')}`
            : ''}
        </Button>
      </div>

      {/* Store switch modal */}
      <StoreSwitchModal
        isOpen={showStoreSwitchModal}
        currentStoreName={storeName ?? undefined}
        onConfirm={confirmStoreSwitch}
        onCancel={cancelStoreSwitch}
      />
    </PageWrapper>
  );
};

export default withLocation(withAuth(CartPage));
