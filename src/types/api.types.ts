// src/types/api.types.ts

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: string[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface Address {
  id: number;
  userId: number;
  type: 'home' | 'work' | 'other';
  line1: string;
  line2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}
