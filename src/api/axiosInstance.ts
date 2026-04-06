import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { config } from '@/constants/config';
import { ApiError } from '@/types/api.types';
import { ENDPOINTS } from './endpoints';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const api: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
api.interceptors.request.use(
  (reqConfig: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && reqConfig.headers) {
      reqConfig.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return reqConfig;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
      error.config;

    // Handle token refresh on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue request until refresh completes
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const { data } = await axios.post(
          `${config.apiBaseUrl}${ENDPOINTS.auth.refresh}`,
          { refreshToken }
        );
        const newAccessToken: string = data.data?.accessToken || data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        onTokenRefreshed(newAccessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest);
      } catch (_refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];

        // Clear auth and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Dynamically import to avoid circular deps
        import('@/store/authStore').then(({ useAuthStore }) => {
          useAuthStore.getState().clearAuth();
        });

        window.location.href = '/client/login';
        return Promise.reject(_refreshError);
      }
    }

    // Map error response to ApiError
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    const errors: string[] = error.response?.data?.errors || [];

    return Promise.reject(new ApiError(message, status, errors));
  }
);

export { api };
export default api;
