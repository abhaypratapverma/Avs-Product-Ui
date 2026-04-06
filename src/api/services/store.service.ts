import { api } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { Store, StoreFilters } from '@/types/store.types';
import type { PaginatedResponse } from '@/types/api.types';

export interface StoreListParams extends StoreFilters {
  districtCode: string;
  page?: number;
  pageSize?: number;
}

export async function getStores(
  params: StoreListParams
): Promise<PaginatedResponse<Store>> {
  const { data } = await api.get(ENDPOINTS.stores.list, { params });
  return data.data;
}

export async function getStoreDetail(storeId: number): Promise<Store> {
  const { data } = await api.get(ENDPOINTS.stores.detail(storeId));
  return data.data;
}
