import React from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useCart } from '@/hooks/useCart';
import { useGuestAccess } from '@/hoc/withGuestAccess';
import { formatCurrencyShort } from '@/utils/formatCurrency';
import type { Product } from '@/types/product.types';

interface ProductCardProps {
  data: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, className }) => {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const { requireAuth } = useGuestAccess();
  const qty = getItemQuantity(data.id);

  const handleAdd = () => {
    if (!requireAuth()) return;
    addItem({
      productId: data.id,
      productName: data.name,
      imageUrl: data.imageUrls[0],
      price: data.price,
      quantity: 1,
      unit: data.unit,
      storeId: data.storeId,
    });
  };

  const handleIncrement = () => updateQuantity(data.id, qty + 1);
  const handleDecrement = () => updateQuantity(data.id, qty - 1);

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-3 shadow-card flex gap-3',
        !data.inStock && 'opacity-60',
        className
      )}
    >
      {/* Image */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        <img
          src={data.imageUrls[0] || '/placeholder-product.png'}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        {!data.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-bold text-textSecondary">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-textPrimary text-sm leading-tight mb-0.5 line-clamp-2">
            {data.name}
          </h3>
          <p className="text-xs text-textSecondary">{data.unit}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-bold text-textPrimary text-base">
              {formatCurrencyShort(data.price)}
            </span>
            {data.originalPrice && data.originalPrice > data.price && (
              <span className="text-xs text-textSecondary line-through ml-1.5">
                {formatCurrencyShort(data.originalPrice)}
              </span>
            )}
          </div>

          {/* Add / Qty control */}
          {data.inStock && (
            <>
              {qty === 0 ? (
                <button
                  onClick={handleAdd}
                  id={`add-product-${data.id}`}
                  className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
                >
                  <ShoppingCart size={14} />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-primary-50 rounded-xl p-1">
                  <button
                    onClick={handleDecrement}
                    className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Minus size={14} className="text-primary" />
                  </button>
                  <span className="w-5 text-center font-bold text-primary text-sm">
                    {qty}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Plus size={14} className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
