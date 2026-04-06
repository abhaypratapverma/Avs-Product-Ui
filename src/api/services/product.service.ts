import { api } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { Product } from '@/types/product.types';

export async function getStoreProducts(storeId: number): Promise<Product[]> {
  const { data } = await api.get(ENDPOINTS.stores.products(storeId));
  return data.data;
}
