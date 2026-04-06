export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PREPARED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl?: string;
  quantity: number;
  unit: string;
  price: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  status: OrderStatus;
  storeId: number;
  storeName: string;
  storeLogo?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  total: number;
  deliveryAddress: string;
  placedAt: string;
  estimatedDelivery?: string;
  updatedAt: string;
}

export interface Address {
  id: number;
  label: string; // "Home", "Work", "Other"
  line1: string;
  line2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  lat?: number;
  lng?: number;
}
