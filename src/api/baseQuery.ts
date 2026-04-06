// src/api/baseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { axiosInstance } from './axiosInstance';
import type { ApiError } from '../types/api.types';
import type { AxiosRequestConfig } from 'axios';

interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const axiosBaseQuery = (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance({ url, method, data, params, headers });
      return { data: result };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        error: {
          message: apiError.message ?? 'Request failed',
          statusCode: apiError.statusCode ?? 0,
          errors: apiError.errors ?? [],
        },
      };
    }
  };
