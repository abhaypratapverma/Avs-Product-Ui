import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { ROUTES } from '@/constants/routes';
import { formatCurrencyShort } from '@/utils/formatCurrency';

export const CartPreviewBar: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems, totalAmount, isEmpty } = {
    totalItems: useCartStore((s) => s.totalItems),
    totalAmount: useCartStore((s) => s.totalAmount),
    isEmpty: useCartStore((s) => s.items.length === 0),
  };

  return (
    <AnimatePresence>
      {!isEmpty && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-mobile px-4 z-30"
        >
          <button
            onClick={() => navigate(ROUTES.CART)}
            id="cart-preview-bar"
            className="w-full bg-primary text-white rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-elevated active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-2">
              <div className="bg-white/20 rounded-xl p-1.5">
                <ShoppingCart size={18} />
              </div>
              <span className="font-semibold text-sm">
                {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{formatCurrencyShort(totalAmount)}</span>
              <ArrowRight size={18} />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
