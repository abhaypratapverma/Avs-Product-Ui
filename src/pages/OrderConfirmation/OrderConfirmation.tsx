// src/pages/OrderConfirmation/OrderConfirmation.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home, Clock } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { ROUTES } from '../../constants/routes';

export function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const orderNum = `AVS-2024-${orderId?.slice(-5) ?? '00000'}`;

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 py-10 text-center">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle className="w-14 h-14 text-white" />
        </div>
      </motion.div>

      {/* Confetti dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#2563EB', '#F97316', '#16A34A', '#EC4899', '#F59E0B'][i % 5],
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 10}%`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-20, 20, -20], opacity: [0, 1, 0] }}
          transition={{ delay: 0.3 + i * 0.1, duration: 1.5, repeat: 2 }}
        />
      ))}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-2xl font-black text-gray-900">Order Placed! 🎉</h1>
        <p className="text-muted text-sm mt-2 leading-relaxed">
          Your order has been confirmed and will be delivered soon
        </p>

        <div className="mt-6 bg-white rounded-card p-4 shadow-card w-full max-w-xs mx-auto text-left">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted">Order Number</p>
              <p className="font-bold text-gray-900 text-sm">{orderNum}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-xs text-muted">Estimated Delivery</p>
              <p className="font-bold text-gray-900 text-sm">30-45 minutes</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8 w-full max-w-xs mx-auto">
          <Button
            size="lg"
            fullWidth
            onClick={() => navigate(`/orders/${orderId}`)}
          >
            Track Order
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => navigate(ROUTES.home)}
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
