import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Package2 } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { OrderStepper } from '@/components/molecules/OrderStepper';
import { formatCurrencyShort } from '@/utils/formatCurrency';
import { formatRelativeTime } from '@/utils/formatDate';
import { orderDetailPath } from '@/constants/routes';
import type { Order } from '@/types/order.types';

interface OrderCardProps {
  order: Order;
}

const statusBadge = (status: Order['status']) => {
  const map: Record<Order['status'], { variant: Parameters<typeof Badge>[0]['variant']; label: string }> = {
    PLACED: { variant: 'default', label: 'Placed' },
    CONFIRMED: { variant: 'featured', label: 'Confirmed' },
    PREPARED: { variant: 'warning', label: 'Ready' },
    OUT_FOR_DELIVERY: { variant: 'warning', label: 'On the Way' },
    DELIVERED: { variant: 'success', label: 'Delivered' },
    CANCELLED: { variant: 'error', label: 'Cancelled' },
  };
  return map[status];
};

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();
  const badge = statusBadge(order.status);

  return (
    <button
      onClick={() => navigate(orderDetailPath(order.id))}
      className="w-full bg-white rounded-2xl shadow-card p-4 text-left active:scale-[0.99] transition-transform"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {order.storeLogo ? (
            <img
              src={order.storeLogo}
              alt={order.storeName}
              className="w-9 h-9 rounded-xl object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
              <Package2 size={18} className="text-primary" />
            </div>
          )}
          <div>
            <p className="font-semibold text-textPrimary text-sm">{order.storeName}</p>
            <p className="text-xs text-textSecondary flex items-center gap-1">
              <Clock size={10} />
              {formatRelativeTime(order.placedAt)}
            </p>
          </div>
        </div>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>

      {/* Items preview */}
      <p className="text-xs text-textSecondary mb-3 truncate">
        {order.items.map((i) => `${i.productName} ×${i.quantity}`).join(', ')}
      </p>

      {/* Stepper for active orders */}
      {!['DELIVERED', 'CANCELLED'].includes(order.status) && (
        <div className="mb-3">
          <OrderStepper status={order.status} />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-textSecondary">{order.items.length} item(s)</span>
        <span className="font-bold text-textPrimary">{formatCurrencyShort(order.total)}</span>
      </div>
    </button>
  );
};
