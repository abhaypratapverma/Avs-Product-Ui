// src/components/organisms/CartPreviewBar/CartPreviewBar.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { formatCurrency } from '../../../utils/formatCurrency';
import { ROUTES } from '../../../constants/routes';

export function CartPreviewBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, totalAmount, storeName } = useAppSelector((s) => s.cart);
  const isCartPage = location.pathname === ROUTES.cart;

  const visible = totalItems > 0 && !isCartPage;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-[68px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[400px] z-20"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        >
          <button
            onClick={() => navigate(ROUTES.cart)}
            className="w-full bg-primary text-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg active:scale-[0.98] transition-transform"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} · {formatCurrency(totalAmount)}
              </p>
              <p className="text-xs text-white/80 truncate">{storeName}</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold flex-shrink-0">
              View Cart <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
