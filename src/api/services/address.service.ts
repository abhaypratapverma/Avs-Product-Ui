import { api } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { Address } from '@/types/order.types';

export type CreateAddressPayload = Omit<Address, 'id' | 'isDefault'>;
export type UpdateAddressPayload = Partial<CreateAddressPayload>;

export async function getAddresses(): Promise<Address[]> {
  const { data } = await api.get(ENDPOINTS.address.list);
  return data.data;
}

export async function createAddress(payload: CreateAddressPayload): Promise<Address> {
  const { data } = await api.post(ENDPOINTS.address.create, payload);
  return data.data;
}

export async function updateAddress(
  id: number,
  payload: UpdateAddressPayload
): Promise<Address> {
  const { data } = await api.put(ENDPOINTS.address.update(id), payload);
  return data.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await api.delete(ENDPOINTS.address.delete(id));
}

export async function setDefaultAddress(id: number): Promise<Address> {
  const { data } = await api.post(ENDPOINTS.address.setDefault(id));
  return data.data;
}

export async function getDefaultAddress(): Promise<Address | null> {
  const { data } = await api.get(ENDPOINTS.address.getDefault);
  return data.data;
}
