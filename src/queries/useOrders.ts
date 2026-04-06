import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getOrders, getOrderDetail } from '@/api/services/order.service';
import { useAuthStore } from '@/store/authStore';

export function useOrders() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.orders.list(),
    queryFn: getOrders,
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000,
  });
}

export function useOrderDetail(orderId: number) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.orders.detail(orderId),
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId && isAuthenticated,
    staleTime: 60 * 1000,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Poll every 30s for active orders
      if (
        status &&
        !['DELIVERED', 'CANCELLED'].includes(status)
      ) {
        return 30 * 1000;
      }
      return false;
    },
  });
}
