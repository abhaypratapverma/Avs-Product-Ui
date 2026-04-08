// src/pages/Onboarding/Login.tsx
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowRight, ShieldCheck, Lock, Globe, Mail, Key } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { useAppDispatch } from '../../store';
import { setAuth } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../api/services/authApi';
import { ROUTES } from '../../constants/routes';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo ?? ROUTES.home;

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const onLogin = async (data: LoginForm) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setAuth({ user: res.user, accessToken: res.accessToken, refreshToken: res.refreshToken }));
      toast.success('Logged in successfully!');

      navigate(returnTo, { replace: true });
    } catch {
      toast.error('Invalid email or password. Please try again.');
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
            Welcome Back to <span className="text-primary">AVS</span>
          </h1>
          <p className="text-muted text-sm mt-1">
            Enter your credentials to access your account.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onLogin)}
          className="flex flex-col gap-6 mt-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
            <div className="flex items-center gap-0 mt-2 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
              <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
              />
            </div>
            {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
            <div className="flex items-center gap-0 mt-2 bg-blue-50/60 rounded-xl overflow-hidden border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
              <div className="flex items-center gap-2 pl-4 pr-2 py-3 flex-shrink-0 border-r border-border">
                <Key className="w-5 h-5 text-gray-500" />
              </div>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
              />
            </div>
            {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" size="lg" fullWidth loading={isLoggingIn} rightIcon={<ArrowRight className="w-5 h-5" />}>
            Login
          </Button>

          <p className="text-center text-sm font-medium text-gray-600 mt-2">
            Don't have an account?{' '}
            <Link to={ROUTES.register} className="text-primary hover:underline font-bold">
              Register here
            </Link>
          </p>
        </motion.form>

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
