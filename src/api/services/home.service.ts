import { api } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { Banner, Category, Store } from '@/types/store.types';

export async function getHomeBanners(districtCode: string): Promise<Banner[]> {
  const { data } = await api.get(ENDPOINTS.home.banners, {
    params: { districtCode },
  });
  return data.data;
}

export async function getHomeShops(districtCode: string): Promise<Store[]> {
  const { data } = await api.get(ENDPOINTS.home.shops, {
    params: { districtCode },
  });
  return data.data;
}

export async function getHomeCategories(districtCode: string): Promise<Category[]> {
  const { data } = await api.get(ENDPOINTS.home.categories, {
    params: { districtCode },
  });
  return data.data;
}

export async function getTopMerchants(districtCode: string): Promise<Store[]> {
  const { data } = await api.get(ENDPOINTS.home.merchants, {
    params: { districtCode },
  });
  return data.data;
}
