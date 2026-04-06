import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, ArrowRight, ChevronLeft } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { sendOtp, verifyOtp } from '@/api/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';
import toast from 'react-hot-toast';

type Step = 'phone' | 'otp';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const returnTo = (location.state as { returnTo?: string })?.returnTo || ROUTES.HOME;

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }
    setIsLoading(true);
    try {
      await sendOtp({ phone: `+91${phone}` });
      toast.success('OTP sent successfully!');
      setStep('otp');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Enter the 6-digit OTP');
      return;
    }
    setIsLoading(true);
    try {
      const result = await verifyOtp({ phone: `+91${phone}`, otp });
      setAuth(result.user, result.tokens.accessToken, result.tokens.refreshToken);
      toast.success('Welcome to AVS!');

      if (result.isNewUser) {
        navigate(ROUTES.PROFILE_SETUP, { replace: true });
      } else {
        navigate(returnTo, { replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <AuthLayout
        title={step === 'phone' ? 'Welcome back!' : 'Enter OTP'}
        subtitle={
          step === 'phone'
            ? 'Sign in to order from local stores near you'
            : `We sent a 6-digit OTP to +91 ${phone}`
        }
      >
        {step === 'phone' ? (
          <div className="space-y-4">
            <Input
              label="Mobile Number"
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              inputMode="tel"
              maxLength={10}
              leftIcon={<Phone size={16} />}
              id="phone-input"
            />
            <Button
              fullWidth
              size="lg"
              onClick={handleSendOtp}
              isLoading={isLoading}
              disabled={phone.length !== 10}
              rightIcon={<ArrowRight size={18} />}
              id="send-otp-btn"
            >
              Get OTP
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* OTP boxes */}
            <div>
              <label className="text-sm font-medium text-textPrimary block mb-2">
                OTP Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                id="otp-input"
                className="w-full h-14 rounded-2xl border border-border bg-white px-4 text-2xl font-bold tracking-[0.5em] text-center text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
              />
            </div>

            <Button
              fullWidth
              size="lg"
              onClick={handleVerifyOtp}
              isLoading={isLoading}
              disabled={otp.length !== 6}
              id="verify-otp-btn"
            >
              Verify OTP
            </Button>

            <button
              onClick={() => setStep('phone')}
              className="w-full flex items-center justify-center gap-1 text-sm text-textSecondary mt-2"
            >
              <ChevronLeft size={16} />
              Change number
            </button>

            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full text-sm text-primary font-medium text-center"
            >
              Resend OTP
            </button>
          </div>
        )}
      </AuthLayout>
    </PageWrapper>
  );
};

export default Login;
