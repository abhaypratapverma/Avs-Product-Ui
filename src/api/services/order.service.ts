import { api } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { Order } from '@/types/order.types';

export interface PlaceOrderPayload {
  addressId: number;
  storeId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  notes?: string;
}

export async function placeOrder(payload: PlaceOrderPayload): Promise<Order> {
  const { data } = await api.post(ENDPOINTS.orders.place, payload);
  return data.data;
}

export async function getOrders(): Promise<Order[]> {
  const { data } = await api.get(ENDPOINTS.orders.list);
  return data.data;
}

export async function getOrderDetail(orderId: number): Promise<Order> {
  const { data } = await api.get(ENDPOINTS.orders.detail(orderId));
  return data.data;
}
