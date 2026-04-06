// src/api/axiosInstance.ts
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { CONFIG } from '../constants/config';
import type { ApiError } from '../types/api.types';
import { ENDPOINTS } from './endpoints';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StoreRef = { getState: () => any; dispatch: (action: any) => void } | null;

let storeRef: StoreRef = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function injectStore(store: any): void {
  storeRef = store as StoreRef;
}

export const axiosInstance = axios.create({
  baseURL: CONFIG.apiBaseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (storeRef) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const state = storeRef.getState();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const token = state?.auth?.accessToken as string | undefined;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const districtCode = state?.location?.districtCode as string | undefined;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (districtCode) {
        config.headers['X-District-Code'] = districtCode;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(normalizeError(error)),
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    // Unwrap the API envelope: { data: { data: <actual> } }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return (response.data as { data: unknown })?.data ?? response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post<{ accessToken: string }>(
          `${CONFIG.apiBaseUrl}${ENDPOINTS.auth.refresh}`,
          {},
          { withCredentials: true },
        );
        const newToken = refreshRes.data.accessToken;
        if (storeRef && newToken) {
          const { setAuth } = await import('../store/slices/authSlice');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const state = storeRef.getState();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          storeRef.dispatch(setAuth({ user: state?.auth?.user, accessToken: newToken }));
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        if (storeRef) {
          const { clearAuth } = await import('../store/slices/authSlice');
          storeRef.dispatch(clearAuth());
        }
        window.location.href = '/login';
        return Promise.reject(normalizeError(error));
      }
    }

    return Promise.reject(normalizeError(error));
  },
);

function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: string[] } | undefined;
    return {
      message: data?.message ?? error.message ?? 'Something went wrong',
      statusCode: error.response?.status ?? 0,
      errors: data?.errors ?? [],
    };
  }
  return { message: 'An unexpected error occurred', statusCode: 0, errors: [] };
}
