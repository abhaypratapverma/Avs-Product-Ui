// src/api/services/homeApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../endpoints';
import { axiosInstance } from '../axiosInstance';
import type { Banner, Category, Merchant, Store } from '../../types/store.types';
import { MOCK_BANNERS, MOCK_CATEGORIES, MOCK_MERCHANTS, MOCK_STORES } from '../../mock';
import { CONFIG } from '../../constants/config';
import {
  mapApiBanner,
  mapApiCategory,
  mapApiMerchant,
  mapApiShopToStore,
} from '../mappers/customerPublic';

const USE_MOCK = CONFIG.useMock;

async function axiosFetch<T>(url: string): Promise<{ data: T } | { error: { message: string; statusCode: number; errors: string[] } }> {
  try {
    const res = (await axiosInstance.get<T>(url)) as unknown as T;
    return { data: res };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function axiosPost<T>(url: string, body: unknown): Promise<{ data: T } | { error: { message: string; statusCode: number; errors: string[] } }> {
  try {
    const res = (await axiosInstance.post<T>(url, body)) as unknown as T;
    return { data: res };
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
        const result = await axiosFetch<unknown[]>(ENDPOINTS.home.banner(districtCode));
        if ('error' in result) return result;
        const rows = Array.isArray(result.data) ? result.data : [];
        return {
          data: rows.map((row) => mapApiBanner(row as Record<string, unknown>, districtCode)),
        };
      },
    }),
    getShops: builder.query<Store[], { districtCode: string; Category: string[] | null }>({
      queryFn: async ({ districtCode, Category }) => {
        if (USE_MOCK) {
          return {
            data: MOCK_STORES.filter((s) => {
              const districtMatch = s.districtCode === districtCode || districtCode === '';
              const categoryMatch = !Category || Category.length === 0 || Category.some((c) => s.category.toLowerCase() === c.toLowerCase());
              return districtMatch && categoryMatch;
            }),
          };
        }
        const payload = { districtCode, Category };
        const result = await axiosPost<unknown[]>(ENDPOINTS.home.shops, payload);
        if ('error' in result) return result;
        const rows = Array.isArray(result.data) ? result.data : [];
        return { data: rows.map((row) => mapApiShopToStore(row as Record<string, unknown>)) };
      },
    }),
    getCategories: builder.query<Category[], void>({
      queryFn: async () => {
        if (USE_MOCK) return { data: MOCK_CATEGORIES };
        const result = await axiosFetch<unknown[]>(ENDPOINTS.home.categoriesShops);
        if ('error' in result) return result;
        const rows = Array.isArray(result.data) ? result.data : [];
        const mapped = rows.map((r) => mapApiCategory(r as Record<string, unknown>));
        const roots = mapped.filter((c) => c.parentId == null);
        const allChip: Category = { id: -1, name: 'All', icon: '🏪', slug: 'all', parentId: null };
        return { data: [allChip, ...roots] };
      },
    }),
    getMerchants: builder.query<Merchant[], string>({
      queryFn: async (districtCode) => {
        if (USE_MOCK) return { data: MOCK_MERCHANTS };
        const result = await axiosFetch<unknown[]>(ENDPOINTS.home.topMerchants(districtCode));
        if ('error' in result) return result;
        const rows = Array.isArray(result.data) ? result.data : [];
        return { data: rows.map((row) => mapApiMerchant(row as Record<string, unknown>)) };
      },
    }),
  }),
});

export const {
  useGetBannersQuery,
  useLazyGetShopsQuery,
  useGetShopsQuery,
  useGetCategoriesQuery,
  useGetMerchantsQuery,
} = homeApi;
