// src/types/product.types.ts

export interface Product {
  id: number;
  storeId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  mrp: number;
  unit: string;
  category: string;
  inStock: boolean;
  isDeal: boolean;
  discountPercent?: number;
  brand?: string;
}
