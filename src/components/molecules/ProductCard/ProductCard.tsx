// src/components/molecules/ProductCard/ProductCard.tsx
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Badge } from '../../atoms/Badge';
import { formatCurrency } from '../../../utils/formatCurrency';
import type { Product } from '../../../types/product.types';
import { useCart } from '../../../hooks/useCart';

type ProductCardVariant = 'grid' | 'list';

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  storeName: string;
  className?: string;
}

export function ProductCard({ product, variant = 'grid', storeName, className }: ProductCardProps) {
  const { addToCart, removeFromCart, setQuantity, getItemQuantity } = useCart();
  const qty = getItemQuantity(product.id);
  const discountPct = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAdd = () => addToCart(product, storeName);
  const handleInc = () => setQuantity(product.id, qty + 1);
  const handleDec = () => {
    if (qty === 1) removeFromCart(product.id);
    else setQuantity(product.id, qty - 1);
  };

  if (variant === 'list') {
    return (
      <div className={cn('flex items-center gap-3 bg-white rounded-card p-3 shadow-card', className)}>
        <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          {product.isDeal && <div className="absolute top-0 right-0"><Badge variant="deal" className="text-[9px] px-1" /></div>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
          <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
            {product.brand && <span className="font-medium text-primary">{product.brand}</span>}
            {product.brand && <span>&bull;</span>}
            <span>{product.unit}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-gray-900 text-sm">{formatCurrency(product.price)}</span>
            {discountPct > 0 && (
              <span className="text-xs text-muted line-through">{formatCurrency(product.mrp)}</span>
            )}
            {discountPct > 0 && (
              <span className="text-xs text-success font-semibold">{discountPct}% off</span>
            )}
          </div>
        </div>
        {product.inStock ? (
          qty > 0 ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={handleDec} className="w-7 h-7 rounded-full bg-primary flex items-center justify-center active:scale-90 transition-transform">
                <Minus className="w-3.5 h-3.5 text-white" />
              </button>
              <span className="w-5 text-center font-bold text-sm">{qty}</span>
              <button onClick={handleInc} className="w-7 h-7 rounded-full bg-primary flex items-center justify-center active:scale-90 transition-transform">
                <Plus className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex-shrink-0 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg active:scale-95 transition-transform"
            >
              + ADD
            </button>
          )
        ) : (
          <span className="text-xs text-muted font-medium">Out of stock</span>
        )}
      </div>
    );
  }

  // GRID variant
  return (
    <div className={cn('bg-white rounded-card overflow-hidden shadow-card flex flex-col', className)}>
      <div className="relative h-[120px]">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        {product.isDeal && (
          <div className="absolute top-1.5 right-1.5">
            <Badge variant="deal" />
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-muted">Out of stock</span>
          </div>
        )}
      </div>
      <div className="p-2.5 flex flex-col flex-1">
        <p className="font-semibold text-gray-900 text-[13px] leading-tight line-clamp-2">{product.name}</p>
        <div className="text-[11px] text-muted mt-1 flex flex-wrap items-center gap-x-1">
          {product.brand && <span className="font-medium text-primary truncate max-w-full">{product.brand}</span>}
          {product.brand && <span>&bull;</span>}
          <span className="whitespace-nowrap">{product.unit}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span className="font-bold text-gray-900 text-sm">{formatCurrency(product.price)}</span>
            {discountPct > 0 && (
              <div className="text-[10px] text-muted line-through">{formatCurrency(product.mrp)}</div>
            )}
          </div>
          {product.inStock && (
            qty > 0 ? (
              <div className="flex items-center gap-1.5">
                <button onClick={handleDec} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center active:scale-90">
                  <Minus className="w-3 h-3 text-white" />
                </button>
                <span className="w-4 text-center font-bold text-xs">{qty}</span>
                <button onClick={handleInc} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center active:scale-90">
                  <Plus className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-9 h-7 bg-primary text-white text-xs font-semibold rounded-lg flex items-center justify-center active:scale-95 transition-transform"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
