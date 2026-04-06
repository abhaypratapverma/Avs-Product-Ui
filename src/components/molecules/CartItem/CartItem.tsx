// src/components/molecules/CartItem/CartItem.tsx
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useCart } from '../../../hooks/useCart';
import type { CartItem as CartItemType } from '../../../types/cart.types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { setQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-3 bg-white rounded-card p-3 shadow-card">
      <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
        <p className="text-xs text-muted">{item.unit}</p>
        <p className="font-bold text-primary text-sm mt-0.5">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button
          onClick={() => removeFromCart(item.productId)}
          className="text-muted hover:text-danger transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(item.productId, item.quantity - 1)}
            className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center active:scale-90"
          >
            <Minus className="w-3 h-3 text-primary" />
          </button>
          <span className="w-5 text-center font-bold text-sm">{item.quantity}</span>
          <button
            onClick={() => setQuantity(item.productId, item.quantity + 1)}
            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center active:scale-90"
          >
            <Plus className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
