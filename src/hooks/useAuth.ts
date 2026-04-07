// src/hooks/useAuth.ts
import { useAppSelector, useAppDispatch } from '../store';
import { clearAuth, setGuest } from '../store/slices/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, accessToken, refreshToken, isAuthenticated, isGuest } = useAppSelector((s) => s.auth);

  const logout = () => {
    dispatch(clearAuth());
  };

  const continueAsGuest = () => {
    dispatch(setGuest());
  };

  return { user, accessToken, refreshToken, isAuthenticated, isGuest, logout, continueAsGuest };
}
