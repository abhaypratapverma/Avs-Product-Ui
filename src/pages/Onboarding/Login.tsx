// src/pages/Onboarding/Login.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowRight, ShieldCheck, Lock, Globe } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { useAppDispatch } from '../../store';
import { setAuth } from '../../store/slices/authSlice';
import { useSendOtpMutation, useVerifyOtpMutation } from '../../api/services/authApi';
import { ROUTES } from '../../constants/routes';

const phoneSchema = z.object({
  phone: z.string().min(10).max(10).regex(/^\d+$/, 'Must be 10 digits'),
});

type PhoneForm = z.infer<typeof phoneSchema>;

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo ?? ROUTES.home;

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhoneState] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
  });

  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const onSendOtp = async ({ phone: p }: PhoneForm) => {
    try {
      await sendOtp({ phone: `+91${p}` }).unwrap();
      setPhoneState(p);
      setStep('otp');
      setCountdown(45);
      toast.success('OTP sent to your mobile!');
      setTimeout(() => otpRefs.current[0]?.focus(), 200);
    } catch {
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const v = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = v;
    setOtp(newOtp);
    if (v && index < 5) otpRefs.current[index + 1]?.focus();
    if (!v && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      toast.error('Enter complete 6-digit OTP');
      return;
    }
    try {
      const res = await verifyOtp({ phone: `+91${phone}`, otp: code }).unwrap();
      dispatch(setAuth({ user: res.user, accessToken: res.accessToken }));
      toast.success('Logged in successfully!');
      if (!res.user.isProfileComplete) {
        navigate(ROUTES.profileSetup, { replace: true });
      } else {
        navigate(returnTo, { replace: true });
      }
    } catch {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="flex-1 flex flex-col px-6 pt-10 pb-8">
        {/* Logo */}
        <motion.div
          className="w-20 h-20 bg-primary rounded-[20px] flex items-center justify-center shadow-lg mb-8"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          <span className="text-white font-black text-3xl">A</span>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-2xl font-black text-gray-900">
            Welcome to <span className="text-primary">AVS</span>
          </h1>
          <p className="text-muted text-sm mt-1">
            {step === 'phone'
              ? 'Enter your details to verify your account securely.'
              : `OTP sent to +91 ${phone}. Valid for 10 minutes.`}
          </p>
        </motion.div>

        {step === 'phone' ? (
          <motion.form
            key="phone"
            onSubmit={handleSubmit(onSendOtp)}
            className="flex flex-col gap-6 mt-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
              <div className="flex items-center gap-0 mt-2 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                  <span className="text-lg">🇮🇳</span>
                  <span className="text-sm font-semibold text-gray-700">+91</span>
                </div>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="Enter 10 digit number"
                  maxLength={10}
                  className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
                />
              </div>
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
            </div>

            <Button type="submit" size="lg" fullWidth loading={sendingOtp} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Continue
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="otp"
            className="flex flex-col gap-6 mt-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OTP Verification</label>
                <button
                  type="button"
                  disabled={countdown > 0}
                  onClick={() => { setCountdown(45); }}
                  className={`text-xs font-semibold ${countdown > 0 ? 'text-muted' : 'text-primary'}`}
                >
                  {countdown > 0 ? `Resend in 0:${countdown.toString().padStart(2, '0')}` : 'Resend OTP'}
                </button>
              </div>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`otp-input flex-1 ${digit ? 'filled' : ''}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted text-center mt-3 flex items-center justify-center gap-1">
                <span>ℹ</span> An OTP has been sent to your mobile
              </p>
            </div>

            <Button size="lg" fullWidth loading={verifyingOtp} onClick={handleVerify} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Continue
            </Button>

            <button onClick={() => setStep('phone')} className="text-sm text-primary font-semibold text-center">
              ← Change Number
            </button>
          </motion.div>
        )}

        {/* Trust indicators */}
        <div className="mt-auto pt-8">
          <div className="flex justify-around py-4 border-t border-border">
            {[
              { icon: ShieldCheck, label: 'SECURE' },
              { icon: Lock, label: 'ENCRYPTED' },
              { icon: Globe, label: 'VERIFIED' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 text-muted" />
                <span className="text-[9px] font-bold text-muted tracking-widest">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted text-center mt-2">
            By continuing, you agree to AVS{' '}
            <span className="text-primary">Terms of Service</span>{' '}
            and{' '}
            <span className="text-primary">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
