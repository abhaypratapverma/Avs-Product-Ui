// src/api/services/authApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from '../axiosInstance';
import { ENDPOINTS } from '../endpoints';
import type { User } from '../../types/user.types';
import { CONFIG } from '../../constants/config';

const USE_MOCK = CONFIG.useMock;

interface RegisterRequest { email: string; password: string; name: string; roleName: string; address: string; phone: string; pincode: string }
interface VerifyUserRequest { email: string; otp: string }
interface LoginRequest { email: string; password: string }
interface AuthResponse { user: User; accessToken: string; refreshToken?: string }

async function post<T>(url: string, body: unknown) {
  try {
    // The axios interceptor unwraps the response and returns the data directly
    const res = await axiosInstance.post<T>(url, body) as unknown as T;
    return { data: res };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function get<T>(url: string) {
  try {
    const res = await axiosInstance.get<T>(url) as unknown as T;
    return { data: res };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<{ message: string }, RegisterRequest>({
      queryFn: async (body) => {
        if (USE_MOCK) return { data: { message: 'OTP sent to email' } };
        return post<{ message: string }>(ENDPOINTS.auth.register, body);
      },
    }),
    verifyUser: builder.mutation<{ message: string }, VerifyUserRequest>({
      queryFn: async (body) => {
        if (USE_MOCK) return { data: { message: 'User verified successfully' } };
        return post<{ message: string }>(ENDPOINTS.auth.verifyUser, body);
      },
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: async (body) => {
        if (USE_MOCK) {
          return {
            data: {
              user: {
                id: 1, name: 'Abhay Pratap', phone: '+91-9876543210',
                isProfileComplete: false, createdAt: new Date().toISOString(),
              },
              accessToken: 'mock_access_token_phase1',
              refreshToken: 'mock_refresh_token',
            },
          };
        }
        return post<AuthResponse>(ENDPOINTS.auth.login, body);
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
    logout: builder.mutation<void, { refreshToken: string }>({
      queryFn: async (body) => {
        if (USE_MOCK) return { data: undefined };
        // We set up axios to pass refreshToken to the body as user provided
        try {
          await axiosInstance.post<{ message: string }>(ENDPOINTS.auth.logout, body);
          return { data: undefined };
        } catch (e) {
            const err = e as { message?: string };
            return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useVerifyUserMutation, useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;
