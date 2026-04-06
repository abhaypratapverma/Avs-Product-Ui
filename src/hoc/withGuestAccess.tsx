import React, { createContext, useContext, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

interface GuestAccessContextValue {
  isAuthenticated: boolean;
  /** Call this before any auth-requiring action. Returns true if user is authed. */
  requireAuth: () => boolean;
}

const GuestAccessContext = createContext<GuestAccessContextValue>({
  isAuthenticated: false,
  requireAuth: () => false,
});

export function useGuestAccess() {
  return useContext(GuestAccessContext);
}

function LoginPromptSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full max-w-mobile mx-auto bg-white rounded-t-3xl p-6 animate-slide-up shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🛍️</div>
          <h3 className="text-xl font-semibold text-textPrimary mb-2">
            Sign in to continue
          </h3>
          <p className="text-textSecondary text-sm">
            You need to be signed in to perform this action.
          </p>
        </div>
        <button
          onClick={() => {
            onClose();
            navigate(ROUTES.LOGIN);
          }}
          className="w-full py-3.5 bg-primary text-white rounded-2xl font-semibold text-base mb-3"
        >
          Sign In / Register
        </button>
        <button
          onClick={onClose}
          className="w-full py-3.5 text-textSecondary font-medium text-base"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export function withGuestAccess<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const WithGuestAccessComponent: React.FC<P> = (props) => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const { isOpen, open, close } = useBottomSheet();

    const requireAuth = useCallback((): boolean => {
      if (!isAuthenticated) {
        open();
        return false;
      }
      return true;
    }, [isAuthenticated, open]);

    return (
      <GuestAccessContext.Provider value={{ isAuthenticated, requireAuth }}>
        <WrappedComponent {...props} />
        <LoginPromptSheet isOpen={isOpen} onClose={close} />
      </GuestAccessContext.Provider>
    );
  };

  WithGuestAccessComponent.displayName = `withGuestAccess(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithGuestAccessComponent;
}
