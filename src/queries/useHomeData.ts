import { useQueries } from '@tanstack/react-query';
import { useLocationStore } from '@/store/locationStore';
import { QUERY_KEYS } from '@/constants/queryKeys';
import {
  getHomeBanners,
  getHomeShops,
  getHomeCategories,
  getTopMerchants,
} from '@/api/services/home.service';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useHomeData() {
  const districtCode = useLocationStore((s) => s.districtCode);

  const results = useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.home.banners(districtCode ?? ''),
        queryFn: () => getHomeBanners(districtCode!),
        enabled: !!districtCode,
        staleTime: STALE_TIME,
      },
      {
        queryKey: QUERY_KEYS.home.shops(districtCode ?? ''),
        queryFn: () => getHomeShops(districtCode!),
        enabled: !!districtCode,
        staleTime: STALE_TIME,
      },
      {
        queryKey: QUERY_KEYS.home.categories(districtCode ?? ''),
        queryFn: () => getHomeCategories(districtCode!),
        enabled: !!districtCode,
        staleTime: STALE_TIME,
      },
      {
        queryKey: QUERY_KEYS.home.merchants(districtCode ?? ''),
        queryFn: () => getTopMerchants(districtCode!),
        enabled: !!districtCode,
        staleTime: STALE_TIME,
      },
    ],
  });

  const [bannersQuery, shopsQuery, categoriesQuery, merchantsQuery] = results;

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  return {
    banners: bannersQuery.data ?? [],
    shops: shopsQuery.data ?? [],
    categories: categoriesQuery.data ?? [],
    merchants: merchantsQuery.data ?? [],
    isLoading,
    isError,
    refetchAll: () => results.forEach((r) => r.refetch()),
  };
}
