import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { OrderCard } from '@/components/molecules/OrderCard';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Button } from '@/components/atoms/Button';
import { useOrders } from '@/queries/useOrders';
import { withAuth } from '@/hoc/withAuth';
import { ROUTES } from '@/constants/routes';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useOrders();

  return (
    <PageWrapper>
      <div className="px-4 pt-4 pb-8 space-y-4">
        <h1 className="font-black text-xl text-textPrimary">My Orders</h1>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-40" rounded="lg" />
            ))}
          </div>
        ) : !orders?.length ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-6xl mb-5">📦</div>
            <h2 className="text-xl font-bold text-textPrimary mb-2">No orders yet</h2>
            <p className="text-textSecondary text-sm mb-8">
              Your orders will appear here once you place one.
            </p>
            <Button onClick={() => navigate(ROUTES.HOME)} fullWidth size="lg">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default withAuth(OrdersPage);
