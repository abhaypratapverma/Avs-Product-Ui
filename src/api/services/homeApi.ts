// src/api/services/homeApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../endpoints';
import { axiosInstance } from '../axiosInstance';
import type { Banner, Category, Merchant, Store } from '../../types/store.types';
import { MOCK_BANNERS, MOCK_CATEGORIES, MOCK_MERCHANTS, MOCK_STORES } from '../../mock';
import { CONFIG } from '../../constants/config';

const USE_MOCK = CONFIG.useMock;

async function axiosFetch<T>(url: string, params?: Record<string, unknown>): Promise<{ data: T } | { error: { message: string; statusCode: number; errors: string[] } }> {
  try {
    const res = await axiosInstance.get<T>(url, { params });
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Home'],
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], string>({
      queryFn: async (districtCode) => {
        if (USE_MOCK) {
          return { data: MOCK_BANNERS.filter((b) => b.districtCode === districtCode || districtCode === '') };
        }
        return axiosFetch<Banner[]>(ENDPOINTS.home.banners, { districtCode });
      },
    }),
    getShops: builder.query<Store[], string>({
      queryFn: async (districtCode) => {
        if (USE_MOCK) {
          return { data: MOCK_STORES.filter((s) => s.districtCode === districtCode || districtCode === '') };
        }
        return axiosFetch<Store[]>(ENDPOINTS.home.shops, { districtCode });
      },
    }),
    getCategories: builder.query<Category[], void>({
      queryFn: async () => {
        if (USE_MOCK) return { data: MOCK_CATEGORIES };
        return axiosFetch<Category[]>(ENDPOINTS.home.categories);
      },
    }),
    getMerchants: builder.query<Merchant[], string>({
      queryFn: async (districtCode) => {
        if (USE_MOCK) return { data: MOCK_MERCHANTS };
        return axiosFetch<Merchant[]>(ENDPOINTS.home.merchants, { districtCode });
      },
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetShopsQuery,
  useGetCategoriesQuery,
  useGetMerchantsQuery,
} = homeApi;
