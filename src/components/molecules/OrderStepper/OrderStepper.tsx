// src/components/molecules/OrderStepper/OrderStepper.tsx
import { Check } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { OrderStatus } from '../../../types/order.types';

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'confirmed',        label: 'Order Confirmed' },
  { key: 'preparing',        label: 'Preparing' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered',        label: 'Delivered' },
];

const ORDER_INDEX: Record<OrderStatus, number> = {
  pending:          0,
  confirmed:        0,
  preparing:        1,
  out_for_delivery: 2,
  delivered:        3,
  cancelled:        -1,
};

interface OrderStepperProps {
  status: OrderStatus;
}

export function OrderStepper({ status }: OrderStepperProps) {
  const currentIndex = ORDER_INDEX[status];

  if (status === 'cancelled') {
    return (
      <div className="flex items-center justify-center py-4">
        <span className="text-danger font-semibold text-sm">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {STEPS.map((step, i) => {
        const done    = i < currentIndex;
        const active  = i === currentIndex;
        const pending = i > currentIndex;

        return (
          <div key={step.key} className="flex items-start gap-3">
            {/* Dot + Line */}
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                done   && 'bg-success',
                active && 'bg-primary ring-4 ring-primary/20',
                pending && 'bg-border',
              )}>
                {done ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <div className={cn('w-2 h-2 rounded-full', active ? 'bg-white' : 'bg-muted')} />
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('w-0.5 h-8 mt-0.5', done || active ? 'bg-primary' : 'bg-border')} />
              )}
            </div>
            {/* Label */}
            <div className="pb-6 pt-0.5">
              <p className={cn('text-sm font-semibold', done || active ? 'text-gray-900' : 'text-muted')}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
