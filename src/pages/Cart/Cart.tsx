// src/pages/Cart/Cart.tsx
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { CartItem } from '../../components/molecules/CartItem';
import { BillSummary } from '../../components/molecules/BillSummary';
import { Button } from '../../components/atoms/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { usePlaceOrderMutation } from '../../api/services/orderApi';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { ROUTES } from '../../constants/routes';

export function Cart() {
  const navigate = useNavigate();
  const { items, totalAmount, storeName, emptyCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const DELIVERY_FEE = 0; // Free delivery for now
  const storeId = items[0]?.storeId;

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.login, { state: { returnTo: ROUTES.cart } });
      return;
    }
    if (!storeId) return;
    try {
      const order = await placeOrder({
        storeId,
        addressId: 1, // Phase 1: hardcoded
        paymentMethod: 'cod',
      }).unwrap();
      emptyCart();
      navigate(`/order-confirmation/${order.id}`);
      toast.success('Order placed successfully!');
    } catch {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg">My Cart</h1>
        </div>
        <EmptyState
          illustration={<ShoppingCart className="w-16 h-16 text-muted" />}
          title="Your cart is empty"
          subtitle="Add items from a store to get started"
          action={{ label: 'Explore Stores', onClick: () => navigate(ROUTES.explore) }}
          className="mt-10"
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border sticky top-0 z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-gray-900 text-lg">My Cart</h1>
          <p className="text-xs text-muted">{storeName}</p>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4 pb-[calc(68px+6.5rem+env(safe-area-inset-bottom,0px))]">
        {/* Cart Items */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <motion.div
              key={item.productId}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <CartItem item={item} />
            </motion.div>
          ))}
        </div>

        {/* Bill Summary */}
        <BillSummary
          subtotal={totalAmount}
          deliveryFee={DELIVERY_FEE}
        />

        {/* Delivery Info */}
        <div className="bg-blue-50 rounded-xl p-3 flex items-start gap-2">
          <span className="text-blue-500 text-sm mt-0.5">ℹ</span>
          <p className="text-xs text-blue-700">
            Cash on delivery available · Estimated delivery in 30-45 mins
          </p>
        </div>
      </div>

      {/* Place Order CTA — above BottomNav (z-30); matches CartPreviewBar offset */}
      <div className="fixed bottom-[68px] left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-border z-20 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
        <Button
          size="lg"
          fullWidth
          loading={isLoading}
          onClick={handlePlaceOrder}
        >
          Place Order · ₹{totalAmount}
        </Button>
        {!isAuthenticated && (
          <p className="text-xs text-muted text-center mt-2">You'll be asked to login before placing order</p>
        )}
      </div>
    </PageWrapper>
  );
}
