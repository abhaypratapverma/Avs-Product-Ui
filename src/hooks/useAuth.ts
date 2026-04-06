import { useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { logout } from '@/api/services/auth.service';
import toast from 'react-hot-toast';

export function useAuth() {
  const { user, accessToken, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const handleLogout = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      if (refreshToken) {
        await logout(refreshToken);
      }
    } catch {
      // Ignore logout API errors — still clear local state
    } finally {
      clearAuth();
      toast.success('Logged out successfully.');
    }
  }, [clearAuth]);

  return {
    user,
    accessToken,
    isAuthenticated,
    setAuth,
    clearAuth,
    logout: handleLogout,
  };
}
