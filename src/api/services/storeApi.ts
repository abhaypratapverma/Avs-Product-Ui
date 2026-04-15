// src/api/services/storeApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from '../axiosInstance';
import { ENDPOINTS } from '../endpoints';
import type { Store } from '../../types/store.types';
import type { Product } from '../../types/product.types';
import type { CartItem } from '../../types/cart.types';
import { MOCK_STORES } from '../../mock/stores.mock';
import { MOCK_PRODUCTS } from '../../mock/products.mock';
import { CONFIG } from '../../constants/config';
import { mapApiProduct, mapApiShopToStore } from '../mappers/customerPublic';

const USE_MOCK = CONFIG.useMock;

function requestError(e: unknown): { message: string; statusCode: number; errors: string[] } {
  const err = e as { message?: string };
  return { message: err.message ?? 'Request failed', statusCode: 0, errors: [] };
}

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Store'],
  endpoints: (builder) => ({
    getStores: builder.query<Store[], string>({
      queryFn: async (districtCode) => {
        if (USE_MOCK) {
          return { data: MOCK_STORES.filter((s) => s.districtCode === districtCode || districtCode === '') };
        }
        try {
          const res = (await axiosInstance.post(ENDPOINTS.home.shops, { districtCode, Category: null })) as unknown;
          const rows = Array.isArray(res) ? res : [];
          const data: Store[] = rows.map((row) => mapApiShopToStore(row as Record<string, unknown>));
          return { data };
        } catch (e) {
          return { error: requestError(e) };
        }
      },
    }),
    getStoreDetail: builder.query<Store, number>({
      queryFn: async (id) => {
        if (USE_MOCK) {
          const store = MOCK_STORES.find((s) => s.id === id);
          if (!store) return { error: { message: 'Store not found', statusCode: 404, errors: [] } };
          return { data: store };
        }
        try {
          const res = (await axiosInstance.get(ENDPOINTS.customer.storeById(id))) as unknown;
          const data: Store = mapApiShopToStore(res as Record<string, unknown>);
          return { data };
        } catch (e) {
          return { error: requestError(e) };
        }
      },
    }),
    getStoreProducts: builder.query<Product[], { storeId: number; category?: string }>({
      queryFn: async ({ storeId, category }) => {
        if (USE_MOCK) {
          let products = MOCK_PRODUCTS.filter((p) => p.storeId === storeId);
          if (category) products = products.filter((p) => p.category === category);
          return { data: products };
        }
        try {
          const res = (await axiosInstance.get(ENDPOINTS.customer.productsByStoreId(storeId))) as unknown;
          const rows = Array.isArray(res) ? res : [];
          let data: Product[] = rows.map((row) => mapApiProduct(row as Record<string, unknown>, storeId));
          if (category) data = data.filter((p) => p.category === category);
          return { data };
        } catch (e) {
          return { error: requestError(e) };
        }
      },
    }),
    getCart: builder.query<CartItem[], void>({
      queryFn: async () => {
        if (USE_MOCK) {
          try {
            const raw = localStorage.getItem('cart');
            if (raw) {
              const parsed = JSON.parse(raw) as { items?: CartItem[] };
              return { data: parsed.items || [] };
            }
          } catch { /* ignore */ }
          return { data: [] };
        }
        try {
          const res = await axiosInstance.get(ENDPOINTS.cart.get);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const resData = res as any;
          // Support various API response wrappings handling axios interceptor
          let rows: any[] = [];
          if (Array.isArray(resData?.items)) {
            rows = resData.items;
          } else if (Array.isArray(resData?.data?.items)) {
            rows = resData.data.items;
          } else if (Array.isArray(resData?.data)) {
            rows = resData.data;
          } else if (Array.isArray(resData)) {
            rows = resData;
          }
          
          // Map backend cart response to Redux CartItem type
          const data: CartItem[] = rows.map((row: any) => ({
            id: Number(row.id || row.productId || 0),
            productId: Number(row.productId || row.product?.id || 0),
            storeId: Number(row.storeId || row.store?.id || 0),
            name: String(row.product?.name || row.name || row.productName || ''),
            imageUrl: String(row.product?.images?.[0]?.url || row.imageUrl || row.image || ''),
            price: Number(row.product?.price || row.price || 0),
            unit: String(row.product?.unit || row.unit || '1 pc'),
            quantity: Number(row.quantity || 1),
            storeName: row.store?.name ? String(row.store.name) : undefined,
          }));
          return { data };
        } catch (e) {
          return { error: requestError(e) };
        }
      },
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoreDetailQuery,
  useGetStoreProductsQuery,
  useGetCartQuery,
} = storeApi;
