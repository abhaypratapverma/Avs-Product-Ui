import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Keyboard } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { useLocation } from '@/hooks/useLocation';
import { ROUTES } from '@/constants/routes';

const LocationSetup: React.FC = () => {
  const navigate = useNavigate();
  const { requestGPS, resolveFromPincode, isLoading, error } = useLocation();
  const [showPincodeInput, setShowPincodeInput] = useState(false);
  const [pincode, setPincode] = useState('');

  const handleGPS = async () => {
    await requestGPS();
    navigate(ROUTES.HOME, { replace: true });
  };

  const handlePincode = async () => {
    if (pincode.length !== 6) return;
    await resolveFromPincode(pincode);
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <PageWrapper>
      <AuthLayout
        title="Set your location"
        subtitle="We need your location to show nearby stores"
      >
        <div className="space-y-4">
          {/* GPS Option */}
          <Button
            fullWidth
            size="lg"
            onClick={handleGPS}
            isLoading={isLoading}
            leftIcon={<Navigation size={18} />}
            id="use-gps-btn"
          >
            Use current location
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-textSecondary">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Pincode option */}
          {!showPincodeInput ? (
            <Button
              fullWidth
              size="lg"
              variant="outline"
              onClick={() => setShowPincodeInput(true)}
              leftIcon={<Keyboard size={18} />}
              id="enter-pincode-btn"
            >
              Enter pincode manually
            </Button>
          ) : (
            <div className="space-y-3">
              <Input
                label="Pincode"
                placeholder="e.g. 226001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric"
                maxLength={6}
                id="pincode-input"
              />
              <Button
                fullWidth
                size="lg"
                onClick={handlePincode}
                isLoading={isLoading}
                disabled={pincode.length !== 6}
                leftIcon={<MapPin size={18} />}
                id="confirm-pincode-btn"
              >
                Confirm Location
              </Button>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-sm text-error text-center font-medium">{error}</p>
          )}
        </div>

        {/* Illustration */}
        <div className="text-center mt-6 text-5xl">📍</div>
        <p className="text-center text-xs text-textSecondary mt-2 leading-relaxed">
          Your location helps us show stores in your district only.
        </p>
      </AuthLayout>
    </PageWrapper>
  );
};

export default LocationSetup;
