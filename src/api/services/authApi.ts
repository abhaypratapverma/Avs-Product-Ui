// src/api/services/authApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from '../axiosInstance';
import { ENDPOINTS } from '../endpoints';
import type { User } from '../../types/user.types';
import { CONFIG } from '../../constants/config';

const USE_MOCK = CONFIG.useMock;

interface SendOtpRequest { phone: string }
interface VerifyOtpRequest { phone: string; otp: string }
interface AuthResponse { user: User; accessToken: string }

async function post<T>(url: string, body: unknown) {
  try {
    const res = await axiosInstance.post<T>(url, body);
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function get<T>(url: string) {
  try {
    const res = await axiosInstance.get<T>(url);
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    sendOtp: builder.mutation<{ message: string }, SendOtpRequest>({
      queryFn: async (body) => {
        if (USE_MOCK) return { data: { message: 'OTP sent successfully' } };
        return post<{ message: string }>(ENDPOINTS.auth.sendOtp, body);
      },
    }),
    verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
      queryFn: async (body) => {
        if (USE_MOCK) {
          return {
            data: {
              user: {
                id: 1, name: 'Abhay Pratap', phone: body.phone,
                isProfileComplete: false, createdAt: new Date().toISOString(),
              },
              accessToken: 'mock_access_token_phase1',
            },
          };
        }
        return post<AuthResponse>(ENDPOINTS.auth.verifyOtp, body);
      },
    }),
    getMe: builder.query<User, void>({
      queryFn: async () => {
        if (USE_MOCK) {
          return {
            data: {
              id: 1, name: 'Abhay Pratap', phone: '+91-9876543210',
              isProfileComplete: true, createdAt: '2026-01-01T00:00:00Z',
            },
          };
        }
        return get<User>(ENDPOINTS.auth.me);
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        if (USE_MOCK) return { data: undefined };
        return post<void>(ENDPOINTS.auth.logout, {});
      },
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation, useGetMeQuery, useLogoutMutation } = authApi;
