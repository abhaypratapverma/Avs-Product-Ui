// src/pages/Onboarding/LocationSetup.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Target, Hash } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { useAppDispatch } from '../../store';
import { setLocation } from '../../store/slices/locationSlice';
import { ROUTES } from '../../constants/routes';

export function LocationSetup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPincode, setShowPincode] = useState(false);
  const [pincode, setPincode] = useState('');

  const handleAllowLocation = () => {
    setLoading(true);
    // Phase 1: always resolve to Lucknow
    setTimeout(() => {
      dispatch(setLocation({
        districtCode: 'Lucknow',
        districtLabel: 'Lucknow, UP',
        coords: { lat: 26.8467, lng: 80.9462 },
      }));
      navigate(ROUTES.home);
    }, 1200);
  };

  const handlePincodeSubmit = () => {
    if (pincode.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(setLocation({
        districtCode: 'Lucknow',
        districtLabel: 'Lucknow, UP',
      }));
      navigate(ROUTES.home);
    }, 800);
  };

  return (
    <AuthLayout>
      {/* Map illustration */}
      <div className="relative bg-[#F5EFE0] h-[280px] overflow-hidden flex items-center justify-center">
        <div className="text-8xl opacity-20 absolute">🗺️</div>
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
        </motion.div>
        {/* Verified badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-pill px-4 py-2 shadow-card flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Verified Local Vendors</span>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 px-6 py-8 flex flex-col"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-2xl font-black text-gray-900">Find stores near you</h1>
        <p className="text-muted text-sm mt-2 leading-relaxed">
          Discover trusted local shops in your neighbourhood for faster delivery and personal service.
        </p>

        <div className="flex flex-col gap-3 mt-8">
          <Button
            size="lg"
            fullWidth
            loading={loading && !showPincode}
            onClick={handleAllowLocation}
            leftIcon={<Target className="w-5 h-5" />}
          >
            Allow Location Access
          </Button>

          <button
            onClick={() => setShowPincode(!showPincode)}
            className="text-sm font-semibold text-primary text-center py-2"
          >
            Enter Pincode manually
          </button>

          {showPincode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="flex gap-2"
            >
              <input
                type="tel"
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-blue-50/50 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
              />
              <Button
                loading={loading && showPincode}
                onClick={handlePincodeSubmit}
                leftIcon={<Hash className="w-4 h-4" />}
              >
                Go
              </Button>
            </motion.div>
          )}
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3">
            <span className="text-blue-500 text-sm mt-0.5">ℹ</span>
            <p className="text-xs text-blue-700 font-medium">
              We only show stores in your district for faster, fresher delivery
            </p>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
