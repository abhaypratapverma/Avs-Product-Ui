import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getStoreProducts } from '@/api/services/product.service';

export function useProducts(storeId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.stores.products(storeId),
    queryFn: () => getStoreProducts(storeId),
    enabled: !!storeId,
    staleTime: 3 * 60 * 1000,
  });
}
