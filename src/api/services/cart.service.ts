import { api } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { CartItem } from '@/types/product.types';

export interface CartResponse {
  items: CartItem[];
  storeId: number | null;
  storeName: string | null;
  total: number;
}

export interface AddCartItemPayload {
  productId: number;
  quantity: number;
  storeId: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

export async function getCart(): Promise<CartResponse> {
  const { data } = await api.get(ENDPOINTS.cart.get);
  return data.data;
}

export async function addCartItem(payload: AddCartItemPayload): Promise<CartResponse> {
  const { data } = await api.post(ENDPOINTS.cart.addItem, payload);
  return data.data;
}

export async function updateCartItem(
  itemId: number,
  payload: UpdateCartItemPayload
): Promise<CartResponse> {
  const { data } = await api.put(ENDPOINTS.cart.updateItem(itemId), payload);
  return data.data;
}

export async function removeCartItem(itemId: number): Promise<CartResponse> {
  const { data } = await api.delete(ENDPOINTS.cart.removeItem(itemId));
  return data.data;
}

export async function clearCart(): Promise<void> {
  await api.post(ENDPOINTS.cart.clear);
}
