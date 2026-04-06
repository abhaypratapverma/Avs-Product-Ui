// src/pages/Orders/Orders.tsx
import { useState } from 'react';
import { Package } from 'lucide-react';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { OrderCard } from '../../components/molecules/OrderCard';
import { Skeleton } from '../../components/atoms/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { useGetOrdersQuery } from '../../api/services/orderApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export function Orders() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'active' | 'past'>('active');
  const { data: orders, isLoading } = useGetOrdersQuery();

  const activeOrders = (orders ?? []).filter(o => o.isActive);
  const pastOrders   = (orders ?? []).filter(o => !o.isActive);
  const displayed    = tab === 'active' ? activeOrders : pastOrders;

  return (
    <PageWrapper>
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="font-black text-gray-900 text-xl">My Orders</h1>
        </div>
        {/* Tabs */}
        <div className="flex px-4 gap-1">
          {(['active', 'past'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold border-b-2 transition-colors capitalize ${
                tab === t ? 'border-primary text-primary' : 'border-transparent text-muted'
              }`}
            >
              {t === 'active' ? `Active (${activeOrders.length})` : `Past (${pastOrders.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-card p-4 shadow-card">
              <div className="flex gap-3">
                <Skeleton shape="circle" width="40px" height="40px" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton height="14px" width="60%" />
                  <Skeleton height="12px" width="40%" />
                  <Skeleton height="12px" width="80%" />
                </div>
              </div>
            </div>
          ))
        ) : displayed.length === 0 ? (
          <EmptyState
            illustration={<Package className="w-14 h-14 text-muted" />}
            title={tab === 'active' ? 'No active orders' : 'No past orders'}
            subtitle={tab === 'active' ? 'Your active orders will appear here' : 'Your order history will appear here'}
            action={{ label: 'Start Shopping', onClick: () => navigate(ROUTES.home) }}
            className="mt-6"
          />
        ) : (
          displayed.map(order => (
            <OrderCard key={order.id} order={order} variant={tab} />
          ))
        )}
      </div>
    </PageWrapper>
  );
}
