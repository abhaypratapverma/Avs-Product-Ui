// src/pages/ComingSoon/ComingSoon.tsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { ROUTES } from '../../constants/routes';

export function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="px-4 py-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
        >
          <MapPin className="w-12 h-12 text-primary" />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-black text-gray-900">Coming Soon!</h1>
          <p className="text-muted text-sm mt-2 max-w-xs leading-relaxed">
            We're expanding to new districts soon. Stay tuned for updates on when we'll be available in your area.
          </p>
          <div className="mt-8">
            <Button onClick={() => navigate(ROUTES.home)} variant="primary">
              Go to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
