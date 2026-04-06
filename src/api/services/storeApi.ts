// src/api/services/storeApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from '../axiosInstance';
import { ENDPOINTS } from '../endpoints';
import type { Store } from '../../types/store.types';
import type { Product } from '../../types/product.types';
import { MOCK_STORES } from '../../mock/stores.mock';
import { MOCK_PRODUCTS } from '../../mock/products.mock';
import { CONFIG } from '../../constants/config';

const USE_MOCK = CONFIG.useMock;

async function get<T>(url: string, params?: Record<string, unknown>) {
  try {
    const res = await axiosInstance.get<T>(url, { params });
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Store'],
  endpoints: (builder) => ({
    getStores: builder.query<Store[], { districtCode: string; category?: string }>({
      queryFn: async ({ districtCode, category }) => {
        if (USE_MOCK) {
          let stores = MOCK_STORES.filter((s) => s.districtCode === districtCode || districtCode === '');
          if (category && category !== 'all') {
            stores = stores.filter((s) => s.category.toLowerCase() === category.toLowerCase());
          }
          return { data: stores };
        }
        return get<Store[]>(ENDPOINTS.stores.list, { districtCode, category });
      },
    }),
    getStoreDetail: builder.query<Store, number>({
      queryFn: async (id) => {
        if (USE_MOCK) {
          const store = MOCK_STORES.find((s) => s.id === id);
          if (!store) return { error: { message: 'Store not found', statusCode: 404, errors: [] } };
          return { data: store };
        }
        return get<Store>(ENDPOINTS.stores.detail(id));
      },
    }),
    getStoreProducts: builder.query<Product[], { storeId: number; category?: string }>({
      queryFn: async ({ storeId, category }) => {
        if (USE_MOCK) {
          let products = MOCK_PRODUCTS.filter((p) => p.storeId === storeId);
          if (category) products = products.filter((p) => p.category === category);
          return { data: products };
        }
        return get<Product[]>(ENDPOINTS.stores.products(storeId), { category });
      },
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoreDetailQuery,
  useGetStoreProductsQuery,
} = storeApi;
