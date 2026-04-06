import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getAddresses } from '@/api/services/address.service';
import { useAuthStore } from '@/store/authStore';

export function useAddresses() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.addresses.list(),
    queryFn: getAddresses,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}
