// src/types/order.types.ts

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

export interface Order {
  id: number;
  orderId: string;
  storeId: number;
  storeName: string;
  storeLogo: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  totalItems: number;
  deliveryAddress: string;
  placedAt: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  paymentMethod: 'cod' | 'online';
  isActive: boolean;
}
