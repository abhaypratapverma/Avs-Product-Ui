import { api } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { User, UserProfile } from '@/types/user.types';

export interface SendOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  isNewUser: boolean;
}

export async function sendOtp(payload: SendOtpPayload): Promise<{ message: string }> {
  const { data } = await api.post(ENDPOINTS.auth.sendOtp, payload);
  return data.data;
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<AuthResponse> {
  const { data } = await api.post(ENDPOINTS.auth.verifyOtp, payload);
  return data.data;
}

export async function logout(refreshToken: string): Promise<void> {
  await api.post(ENDPOINTS.auth.logout, { refreshToken });
}

export async function getMe(): Promise<User> {
  const { data } = await api.get(ENDPOINTS.auth.me);
  return data.data;
}

export async function setupProfile(profile: UserProfile): Promise<User> {
  const { data } = await api.post(ENDPOINTS.auth.profileSetup, profile);
  return data.data;
}
