// src/components/molecules/OrderCard/OrderCard.tsx
import { ChevronRight, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import type { Order } from '../../../types/order.types';

type OrderCardVariant = 'active' | 'past';

interface OrderCardProps {
  order: Order;
  variant?: OrderCardVariant;
}

const statusColors: Record<Order['status'], string> = {
  pending:          'text-amber-600 bg-amber-50',
  confirmed:        'text-blue-600 bg-blue-50',
  preparing:        'text-orange-600 bg-orange-50',
  out_for_delivery: 'text-purple-600 bg-purple-50',
  delivered:        'text-success bg-green-50',
  cancelled:        'text-danger bg-red-50',
};

const statusLabel: Record<Order['status'], string> = {
  pending:          'Pending',
  confirmed:        'Confirmed',
  preparing:        'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered:        'Delivered',
  cancelled:        'Cancelled',
};

export function OrderCard({ order, variant = 'past' }: OrderCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/orders/${order.id}`)}
      className={cn(
        'bg-white rounded-card p-4 shadow-card w-full text-left hover:shadow-card-hover transition-shadow',
        variant === 'active' && 'border border-primary/20',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <img src={order.storeLogo} alt={order.storeName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900 text-sm truncate">{order.storeName}</p>
            <ChevronRight className="w-4 h-4 text-muted flex-shrink-0" />
          </div>
          <p className="text-xs text-muted mt-0.5">{order.orderId}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Package className="w-3.5 h-3.5" />
              <span>{order.totalItems} items · {formatCurrency(order.totalAmount)}</span>
            </div>
            <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-chip', statusColors[order.status])}>
              {statusLabel[order.status]}
            </span>
          </div>
          <p className="text-[11px] text-muted mt-1">{formatDate(order.placedAt)}</p>
        </div>
      </div>
    </button>
  );
}
