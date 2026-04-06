export interface Product {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  price: number;
  originalPrice?: number;
  unit: string; // e.g. "500g", "1pc", "1L"
  inStock: boolean;
  storeId: number;
  categoryId?: number;
  tags?: string[];
}

export interface CartItem {
  productId: number;
  productName: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  unit: string;
  storeId: number;
}
