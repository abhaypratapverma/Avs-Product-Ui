// src/store/slices/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user.types';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}

const USER_STORAGE_KEY = 'user';

function parseStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<User>;
    if (parsed && typeof parsed.id === 'number') {
      return parsed as User;
    }
  } catch {
    /* ignore corrupt storage */
  }
  return null;
}

const storedAccess = localStorage.getItem('accessToken');
const storedRefresh = localStorage.getItem('refreshToken');

const initialState: AuthState = {
  user: parseStoredUser(),
  accessToken: storedAccess,
  refreshToken: storedRefresh,
  // Must match token presence — Cart and guards read this, not only localStorage
  isAuthenticated: Boolean(storedAccess),
  isGuest: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: User; accessToken: string; refreshToken?: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
      state.isAuthenticated = true;
      state.isGuest = false;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload.user));
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isGuest = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem(USER_STORAGE_KEY);
    },
    setGuest(state) {
      state.isGuest = true;
      state.isAuthenticated = false;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setAuth, clearAuth, setGuest, updateUser } = authSlice.actions;
export default authSlice.reducer;
