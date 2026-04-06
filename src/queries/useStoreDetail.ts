import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getStoreDetail } from '@/api/services/store.service';

export function useStoreDetail(storeId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.stores.detail(storeId),
    queryFn: () => getStoreDetail(storeId),
    enabled: !!storeId,
    staleTime: 3 * 60 * 1000,
  });
}
