import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrencyShort } from '@/utils/formatCurrency';
import type { CartItem as CartItemType } from '@/types/product.types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-card">
      <img
        src={item.imageUrl || '/placeholder-product.png'}
        alt={item.productName}
        className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-textPrimary text-sm truncate">{item.productName}</h4>
        <p className="text-xs text-textSecondary">{item.unit}</p>
        <p className="font-bold text-textPrimary text-sm mt-1">
          {formatCurrencyShort(item.price * item.quantity)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeItem(item.productId)}
          className="text-error p-1 rounded-lg hover:bg-red-50 active:scale-90 transition-transform"
        >
          <Trash2 size={14} />
        </button>
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-0.5">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center active:scale-90 transition-transform"
          >
            <Minus size={13} className="text-primary" />
          </button>
          <span className="w-5 text-center font-bold text-textPrimary text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center active:scale-90 transition-transform"
          >
            <Plus size={13} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
