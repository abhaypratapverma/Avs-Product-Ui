// src/pages/Orders/OrderDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { OrderStepper } from '../../components/molecules/OrderStepper';
import { useGetOrderDetailQuery } from '../../api/services/orderApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateTime } from '../../utils/formatDate';
import { Skeleton } from '../../components/atoms/Skeleton';

export function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useGetOrderDetailQuery(Number(orderId));

  if (isLoading) {
    return (
      <div className="px-4 py-4 flex flex-col gap-4">
        <Skeleton height="20px" width="50%" />
        <Skeleton height="200px" className="rounded-card" />
        <Skeleton shape="line" lines={4} />
      </div>
    );
  }

  if (!order) return (
    <div className="px-4 py-20 text-center">
      <p className="font-semibold text-gray-800">Order not found</p>
      <button onClick={() => navigate(-1)} className="text-primary text-sm mt-2">Go back</button>
    </div>
  );

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-gray-900">Order Details</h1>
          <p className="text-xs text-muted">{order.orderId}</p>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Store Info */}
        <div className="bg-white rounded-card p-4 shadow-card flex items-center gap-3">
          <img src={order.storeLogo} alt={order.storeName} className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{order.storeName}</p>
            <p className="text-xs text-muted">{formatDateTime(order.placedAt)}</p>
          </div>
          <button className="w-10 h-10 bg-surface rounded-full flex items-center justify-center">
            <Phone className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Order Progress */}
        {order.isActive && (
          <div className="bg-white rounded-card p-4 shadow-card">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">Order Progress</h3>
            <OrderStepper status={order.status} />
          </div>
        )}

        {/* Items */}
        <div className="bg-white rounded-card p-4 shadow-card">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Items Ordered</h3>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-muted">{item.unit} × {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="bg-white rounded-card p-4 shadow-card">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Bill Summary</h3>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">Item total</span>
            <span>{formatCurrency(order.totalAmount)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">Delivery fee</span>
            <span className={order.deliveryFee === 0 ? 'text-success font-semibold' : ''}>{order.deliveryFee === 0 ? 'FREE' : formatCurrency(order.deliveryFee)}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between text-sm font-bold">
            <span>Total paid</span>
            <span className="text-primary">{formatCurrency(order.totalAmount + order.deliveryFee)}</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-card p-4 shadow-card">
          <h3 className="font-semibold text-gray-900 text-sm mb-2">Delivered to</h3>
          <p className="text-sm text-muted leading-relaxed">{order.deliveryAddress}</p>
        </div>
      </div>
    </PageWrapper>
  );
}
