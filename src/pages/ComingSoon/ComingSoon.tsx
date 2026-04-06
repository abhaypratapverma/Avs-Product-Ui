import React, { useState } from 'react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { Button } from '@/components/atoms/Button';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { withLocation } from '@/hoc/withLocation';

const ComingSoonPage: React.FC = () => {
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    setNotified(true);
    toast.success('We\'ll notify you when we launch in your area!');
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
        <div className="text-7xl mb-6">🚀</div>
        <h1 className="text-2xl font-black text-textPrimary mb-3">Coming Soon!</h1>
        <p className="text-textSecondary mb-2 leading-relaxed">
          We're working hard to bring AVS to your area.
          Be the first to know when we launch!
        </p>
        <p className="text-xs text-textSecondary mb-10">
          Currently expanding across districts — stay tuned.
        </p>

        {!notified ? (
          <Button
            fullWidth
            size="lg"
            onClick={handleNotify}
            leftIcon={<Bell size={18} />}
            id="notify-me-btn"
          >
            Notify Me When Available
          </Button>
        ) : (
          <div className="w-full p-4 bg-green-50 rounded-2xl border border-green-200 text-center">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-success font-semibold text-sm">
              You're on the list! We'll notify you soon.
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default withLocation(ComingSoonPage);
