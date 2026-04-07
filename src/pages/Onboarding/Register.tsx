// src/pages/Onboarding/Register.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowRight, ShieldCheck, Lock, Globe, Mail, Key, User, Phone, MapPin } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { useRegisterMutation, useVerifyUserMutation } from '../../api/services/authApi';
import { ROUTES } from '../../constants/routes';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Must be 10 digits').regex(/^\d+$/, 'Numbers only'),
  street: z.string().min(3, 'Enter street address'),
  city: z.string().min(2, 'Enter city'),
  state: z.string().min(2, 'Enter state'),
  pincode: z.string().min(6, 'Must be at least 6 digits').regex(/^\d+$/, 'Numbers only'),
  country: z.string().min(2, 'Enter country').default('India'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [emailForOtp, setEmailForOtp] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { country: 'India' },
  });

  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [verifyUser, { isLoading: isVerifying }] = useVerifyUserMutation();

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const onRegister = async (data: RegisterForm) => {
    try {
      const formattedAddress = `${data.street}, ${data.city}, ${data.state}, ${data.pincode}, ${data.country}`;

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: formattedAddress,
        pincode: data.pincode,
        roleName: 'CLIENT', // hardcoded role as per API curl
      }).unwrap();
      setEmailForOtp(data.email);
      setStep('otp');
      setCountdown(45);
      toast.success('OTP sent to your email!');
      setTimeout(() => otpRefs.current[0]?.focus(), 200);
    } catch {
      toast.error('Registration failed. Please try again.');
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
      await verifyUser({ email: emailForOtp, otp: code }).unwrap();
      toast.success('Account verified successfully!');
      // After verified, take user to Login
      navigate(ROUTES.login, { replace: true });
    } catch {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="flex-1 flex flex-col px-6 pt-10 pb-8">
        <motion.div
          className="w-16 h-16 bg-primary rounded-[16px] flex items-center justify-center shadow-lg mb-6"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          <span className="text-white font-black text-2xl">A</span>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-2xl font-black text-gray-900">
            Join <span className="text-primary">AVS</span>
          </h1>
          <p className="text-muted text-sm mt-1">
            {step === 'details'
              ? 'Create a new account to continue.'
              : `OTP sent to ${emailForOtp}. Valid for 10 minutes.`}
          </p>
        </motion.div>

        {step === 'details' ? (
          <motion.form
            key="details"
            onSubmit={handleSubmit(onRegister)}
            className="flex flex-col gap-4 mt-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* NAME */}
            <div>
              <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Full Name"
                  className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
                />
              </div>
              {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
                />
              </div>
              {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                  <Key className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
                />
              </div>
              {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
            </div>

            {/* PHONE */}
            <div>
              <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                  <span className="text-sm">🇮🇳</span>
                </div>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="10 digit Phone Number"
                  maxLength={10}
                  className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
                />
              </div>
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
            </div>

            {/* ADDRESS SECTION */}
            <div className="pt-2 border-t border-border mt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Address Details</p>
              
              {/* STREET */}
              <div>
                <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                  <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    {...register('street')}
                    type="text"
                    placeholder="House/Flat No, Street"
                    className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
                  />
                </div>
                {errors.street && <p className="text-xs text-danger mt-1">{errors.street.message}</p>}
              </div>

              {/* CITY & PINCODE */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                    <input
                      {...register('city')}
                      type="text"
                      placeholder="City"
                      className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                  </div>
                  {errors.city && <p className="text-xs text-danger mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                    <input
                      {...register('pincode')}
                      type="text"
                      placeholder="Zip Code/Pincode"
                      maxLength={6}
                      className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                  </div>
                  {errors.pincode && <p className="text-xs text-danger mt-1">{errors.pincode.message}</p>}
                </div>
              </div>

              {/* STATE & COUNTRY */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                    <input
                      {...register('state')}
                      type="text"
                      placeholder="State"
                      className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                  </div>
                  {errors.state && <p className="text-xs text-danger mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <div className="flex items-center gap-0 mt-1 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                    <input
                      {...register('country')}
                      type="text"
                      placeholder="Country"
                      className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
                    />
                  </div>
                  {errors.country && <p className="text-xs text-danger mt-1">{errors.country.message}</p>}
                </div>
              </div>
            </div>

            <Button className="mt-2" type="submit" size="lg" fullWidth loading={isRegistering} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Next
            </Button>

            <p className="text-center text-sm font-medium text-gray-600 mt-2">
              Already have an account?{' '}
              <Link to={ROUTES.login} className="text-primary hover:underline font-bold">
                Log in
              </Link>
            </p>
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
            </div>

            <Button size="lg" fullWidth loading={isVerifying} onClick={handleVerify} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Verify & Login
            </Button>

            <button onClick={() => setStep('details')} className="text-sm text-primary font-semibold text-center">
              ← Change Details
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
