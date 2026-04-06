import React from 'react';
import { Check, Package, ChefHat, Truck, MapPin } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { OrderStatus } from '@/types/order.types';

interface OrderStepperProps {
  status: OrderStatus;
}

const steps: Array<{ status: OrderStatus; label: string; icon: React.ReactNode }> = [
  { status: 'PLACED', label: 'Order Placed', icon: <Check size={14} /> },
  { status: 'CONFIRMED', label: 'Confirmed', icon: <Package size={14} /> },
  { status: 'PREPARED', label: 'Prepared', icon: <ChefHat size={14} /> },
  { status: 'OUT_FOR_DELIVERY', label: 'On the way', icon: <Truck size={14} /> },
  { status: 'DELIVERED', label: 'Delivered', icon: <MapPin size={14} /> },
];

const statusOrder: Record<OrderStatus, number> = {
  PLACED: 0,
  CONFIRMED: 1,
  PREPARED: 2,
  OUT_FOR_DELIVERY: 3,
  DELIVERED: 4,
  CANCELLED: -1,
};

export const OrderStepper: React.FC<OrderStepperProps> = ({ status }) => {
  if (status === 'CANCELLED') {
    return (
      <div className="flex items-center gap-2 py-4 justify-center">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-error text-sm font-bold">✕</span>
        </div>
        <span className="text-error font-semibold">Order Cancelled</span>
      </div>
    );
  }

  const currentIndex = statusOrder[status];

  return (
    <div className="flex items-center gap-0 py-2">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;

        return (
          <React.Fragment key={step.status}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                  isCompleted
                    ? 'bg-primary text-white'
                    : isActive
                    ? 'bg-primary-100 text-primary ring-2 ring-primary'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {step.icon}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium text-center leading-tight max-w-[48px]',
                  isActive ? 'text-primary' : isCompleted ? 'text-textPrimary' : 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mb-5 mx-0.5 transition-all',
                  idx < currentIndex ? 'bg-primary' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
