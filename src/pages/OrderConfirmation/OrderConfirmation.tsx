import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { OrderStepper } from '@/components/molecules/OrderStepper';
import { BillSummary } from '@/components/molecules/BillSummary';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useOrderDetail } from '@/queries/useOrders';
import { withAuth } from '@/hoc/withAuth';
import { ROUTES } from '@/constants/routes';
import { formatCurrencyShort } from '@/utils/formatCurrency';

const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const orderId = parseInt(id ?? '0', 10);
  const { data: order, isLoading } = useOrderDetail(orderId);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="px-4 pt-8 space-y-4">
          <Skeleton className="w-20 h-20 mx-auto" rounded="full" />
          <Skeleton className="w-48 h-6 mx-auto" />
          <Skeleton className="w-full h-24" rounded="lg" />
          <Skeleton className="w-full h-32" rounded="lg" />
        </div>
      </PageWrapper>
    );
  }

  if (!order) return null;

  return (
    <PageWrapper>
      <div className="px-4 pt-8 pb-12 space-y-6">
        {/* Success animation */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
            className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 size={48} className="text-success" />
          </motion.div>
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-black text-textPrimary mb-1">Order Placed! 🎉</h1>
            <p className="text-textSecondary text-sm">
              Your order from {order.storeName} is confirmed
            </p>
            <p className="text-xs text-textSecondary mt-1">Order #{order.id}</p>
          </motion.div>
        </div>

        {/* Order tracking */}
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h2 className="font-semibold text-textPrimary mb-4">Track Your Order</h2>
          <OrderStepper status={order.status} />
        </div>

        {/* Order items */}
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h2 className="font-semibold text-textPrimary mb-3">Order Summary</h2>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between">
                <span className="text-sm text-textSecondary">
                  {item.productName} × {item.quantity}
                </span>
                <span className="text-sm font-medium text-textPrimary">
                  {formatCurrencyShort(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bill */}
        <BillSummary
          subtotal={order.subtotal}
          deliveryFee={order.deliveryFee}
          taxes={order.taxes}
        />

        {/* Actions */}
        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => navigate(ROUTES.ORDERS)}
            rightIcon={<ArrowRight size={18} />}
            id="view-orders-btn"
          >
            Track Order
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="ghost"
            onClick={() => navigate(ROUTES.HOME)}
            id="continue-shopping-btn"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default withAuth(OrderConfirmationPage);
