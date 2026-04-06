// src/components/molecules/BillSummary/BillSummary.tsx
import { formatCurrency } from '../../../utils/formatCurrency';

interface BillSummaryProps {
  subtotal: number;
  deliveryFee: number;
  discount?: number;
}

export function BillSummary({ subtotal, deliveryFee, discount = 0 }: BillSummaryProps) {
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="bg-white rounded-card p-4 shadow-card">
      <h3 className="font-semibold text-gray-900 text-sm mb-3">Bill Summary</h3>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Item total</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Delivery fee</span>
          <span className={deliveryFee === 0 ? 'text-success font-semibold' : 'font-medium'}>
            {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted">Discount</span>
            <span className="text-success font-semibold">- {formatCurrency(discount)}</span>
          </div>
        )}
        <div className="h-px bg-border mt-1" />
        <div className="flex justify-between text-sm font-bold">
          <span>To pay</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
