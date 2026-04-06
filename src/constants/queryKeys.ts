import type { StoreFilters } from '@/types/store.types';

export const QUERY_KEYS = {
  home: {
    banners: (districtCode: string) => ['banners', districtCode] as const,
    shops: (districtCode: string) => ['shops', districtCode] as const,
    categories: (districtCode: string) => ['categories', districtCode] as const,
    merchants: (districtCode: string) => ['merchants', districtCode] as const,
  },
  stores: {
    list: (districtCode: string, filters?: StoreFilters) =>
      ['stores', districtCode, filters] as const,
    detail: (storeId: number) => ['store', storeId] as const,
    products: (storeId: number) => ['store-products', storeId] as const,
  },
  cart: {
    get: () => ['cart'] as const,
  },
  orders: {
    list: () => ['orders'] as const,
    detail: (orderId: number) => ['order', orderId] as const,
  },
  addresses: {
    list: () => ['addresses'] as const,
    default: () => ['address-default'] as const,
  },
  user: {
    me: () => ['user-me'] as const,
  },
} as const;
