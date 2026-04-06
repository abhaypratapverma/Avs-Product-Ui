import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { setupProfile } from '@/api/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';
import toast from 'react-hot-toast';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setIsLoading(true);
    try {
      const user = await setupProfile({ name: name.trim(), email: email.trim() || undefined });
      updateUser(user);
      toast.success('Profile set up!');
      navigate(ROUTES.HOME, { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <PageWrapper>
      <AuthLayout
        title="Almost there!"
        subtitle="Tell us a bit about yourself"
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User size={16} />}
            id="profile-name-input"
          />
          <Input
            label="Email (optional)"
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="profile-email-input"
          />

          <Button fullWidth size="lg" onClick={handleSubmit} isLoading={isLoading} id="save-profile-btn">
            Save & Continue
          </Button>

          <button onClick={handleSkip} className="w-full text-sm text-textSecondary text-center">
            Skip for now
          </button>
        </div>
      </AuthLayout>
    </PageWrapper>
  );
};

export default ProfileSetup;
