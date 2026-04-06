// src/types/cart.types.ts

export interface CartItem {
  id: number;
  productId: number;
  storeId: number;
  name: string;
  imageUrl: string;
  price: number;
  unit: string;
  quantity: number;
}
