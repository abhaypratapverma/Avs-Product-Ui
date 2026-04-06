import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/store/locationStore';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getStores } from '@/api/services/store.service';
import type { StoreFilters } from '@/types/store.types';

const PAGE_SIZE = 10;

export function useStores(filters?: StoreFilters) {
  const districtCode = useLocationStore((s) => s.districtCode);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.stores.list(districtCode ?? '', filters),
    queryFn: ({ pageParam = 1 }) =>
      getStores({
        districtCode: districtCode!,
        page: pageParam as number,
        pageSize: PAGE_SIZE,
        ...filters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    enabled: !!districtCode,
    staleTime: 5 * 60 * 1000,
  });
}
