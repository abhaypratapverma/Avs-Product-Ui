// src/pages/Onboarding/ProfileSetup.tsx
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Camera, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Avatar } from '../../components/atoms/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store';
import { updateUser } from '../../store/slices/authSlice';
import { ROUTES } from '../../constants/routes';

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
});

type Form = z.infer<typeof schema>;

export function ProfileSetup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name ?? '' },
  });

  const onSubmit = async ({ name }: Form) => {
    await new Promise(r => setTimeout(r, 800));
    dispatch(updateUser({ name, isProfileComplete: true }));
    toast.success('Profile set up! Welcome to AVS 🎉');
    navigate(ROUTES.home, { replace: true });
  };

  return (
    <AuthLayout>
      <div className="flex-1 flex flex-col px-6 pt-8 pb-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Step 1 of 1</span>
          <div className="flex-1 mx-4 h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-full transition-all" />
          </div>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-2xl font-black text-gray-900">Complete Profile</h1>
          <p className="text-muted text-sm mt-1">Help us personalize your AVS experience.</p>
        </motion.div>

        {/* Avatar */}
        <motion.div
          className="flex flex-col items-center mt-8 mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Avatar name={user?.name ?? 'User'} size="xl" className="w-24 h-24" />
            <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-primary text-sm font-semibold mt-3">Upload Photo</p>
        </motion.div>

        <form onSubmit={void handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            {...register('name')}
            id="name"
            label="Full Name"
            placeholder="Enter your name"
            error={errors.name?.message}
          />

          <Button type="submit" size="lg" fullWidth loading={isSubmitting} rightIcon={<ArrowRight className="w-5 h-5" />}>
            Start Shopping
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
