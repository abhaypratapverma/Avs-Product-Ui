import React from 'react';
import { formatCurrencyShort } from '@/utils/formatCurrency';

interface BillSummaryProps {
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount?: number;
}

export const BillSummary: React.FC<BillSummaryProps> = ({
  subtotal,
  deliveryFee,
  taxes,
  discount = 0,
}) => {
  const total = subtotal + deliveryFee + taxes - discount;

  const rows = [
    { label: 'Item Total', value: subtotal },
    { label: 'Delivery Fee', value: deliveryFee, note: deliveryFee === 0 ? 'FREE' : undefined },
    { label: 'Taxes & Charges', value: taxes },
    discount > 0 ? { label: 'Discount', value: -discount, isDiscount: true } : null,
  ].filter(Boolean) as Array<{
    label: string;
    value: number;
    note?: string;
    isDiscount?: boolean;
  }>;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <h3 className="font-semibold text-textPrimary mb-4">Bill Details</h3>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-sm text-textSecondary">{row.label}</span>
            {row.note && row.value === 0 ? (
              <span className="text-sm font-semibold text-success">{row.note}</span>
            ) : (
              <span
                className={`text-sm font-semibold ${row.isDiscount ? 'text-success' : 'text-textPrimary'}`}
              >
                {row.isDiscount ? '- ' : ''}
                {formatCurrencyShort(Math.abs(row.value))}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
        <span className="font-bold text-textPrimary">To Pay</span>
        <span className="font-bold text-textPrimary text-lg">
          {formatCurrencyShort(total)}
        </span>
      </div>
    </div>
  );
};
