// src/mock/products.mock.ts
import type { Product } from '../types/product.types';

export const MOCK_PRODUCTS: Product[] = [
  // Store 1 - Hazratganj Central Mart (Grocery)
  { id: 1,  storeId: 1, name: 'Fresh Green Broccoli', description: 'Farm fresh broccoli, 1kg pack', imageUrl: 'https://placehold.co/300x300/DCFCE7/16A34A?text=Broccoli', price: 45, mrp: 60, unit: '1 kg', category: 'Vegetables', inStock: true, isDeal: false },
  { id: 2,  storeId: 1, name: 'Shimla Apple Red', description: 'Sweet and juicy Shimla apples', imageUrl: 'https://placehold.co/300x300/FEE2E2/DC2626?text=Apple', price: 89, mrp: 110, unit: '500g', category: 'Fruits', inStock: true, isDeal: true, discountPercent: 19 },
  { id: 3,  storeId: 1, name: 'Full Cream Milk', description: 'Amul full cream toned milk', imageUrl: 'https://placehold.co/300x300/DBEAFE/2563EB?text=Milk', price: 32, mrp: 32, unit: '1 Litre', category: 'Dairy', inStock: true, isDeal: false },
  { id: 4,  storeId: 1, name: 'Farm Fresh Eggs', description: 'Free-range eggs, brown variety', imageUrl: 'https://placehold.co/300x300/FEF9C3/CA8A04?text=Eggs', price: 48, mrp: 55, unit: '6 pcs', category: 'Dairy', inStock: true, isDeal: false },
  { id: 5,  storeId: 1, name: 'Aashirvaad Atta', description: 'Whole wheat flour, premium quality', imageUrl: 'https://placehold.co/300x300/FEF3C7/D97706?text=Atta', price: 280, mrp: 330, unit: '5 kg', category: 'Grocery', inStock: true, isDeal: true, discountPercent: 15 },
  { id: 6,  storeId: 1, name: 'Maggi Noodles', description: 'Classic masala noodles pack of 4', imageUrl: 'https://placehold.co/300x300/FEF9C3/CA8A04?text=Maggi', price: 56, mrp: 68, unit: '4 pack', category: 'Snacks', inStock: true, isDeal: false },

  // Store 3 - Wellness First Pharma
  { id: 7,  storeId: 3, name: 'Dolo 650mg', description: 'Paracetamol tablets, 10 strip', imageUrl: 'https://placehold.co/300x300/DCFCE7/16A34A?text=Dolo', price: 29, mrp: 33, unit: '10 tabs', category: 'Medicine', inStock: true, isDeal: false },
  { id: 8,  storeId: 3, name: 'Vitamin C 500mg', description: 'Immunity booster supplement', imageUrl: 'https://placehold.co/300x300/FEF9C3/CA8A04?text=VitC', price: 149, mrp: 199, unit: '60 tabs', category: 'Vitamins', inStock: true, isDeal: true, discountPercent: 25 },
  { id: 9,  storeId: 3, name: 'Hand Sanitizer', description: '70% isopropyl alcohol, kills 99.9% germs', imageUrl: 'https://placehold.co/300x300/DBEAFE/2563EB?text=Sanitizer', price: 85, mrp: 99, unit: '200ml', category: 'Personal Care', inStock: true, isDeal: false },
  { id: 10, storeId: 3, name: 'Band-Aid Strips', description: 'Flexible fabric bandages', imageUrl: 'https://placehold.co/300x300/FEE2E2/DC2626?text=BandAid', price: 45, mrp: 55, unit: '20 pcs', category: 'Healthcare', inStock: true, isDeal: false },

  // Store 2 - The Gadget Loft
  { id: 11, storeId: 2, name: 'USB-C Cable 2m', description: 'Fast charging & data transfer cable', imageUrl: 'https://placehold.co/300x300/1E293B/F97316?text=USB-C', price: 299, mrp: 499, unit: '1 pc', category: 'Accessories', inStock: true, isDeal: true, discountPercent: 40 },
  { id: 12, storeId: 2, name: 'Screen Protector', description: 'Tempered glass 9H hardness', imageUrl: 'https://placehold.co/300x300/F1F5F9/64748B?text=Screen', price: 149, mrp: 249, unit: '1 pc', category: 'Accessories', inStock: true, isDeal: false },
  { id: 13, storeId: 2, name: 'Bluetooth Earphones', description: 'True wireless with 20hr battery', imageUrl: 'https://placehold.co/300x300/EDE9FE/7C3AED?text=Earphones', price: 799, mrp: 1299, unit: '1 pc', category: 'Audio', inStock: false, isDeal: true, discountPercent: 38 },

  // Store 7 - Daily Fresh Grocery
  { id: 14, storeId: 7, name: 'Tomatoes', description: 'Fresh red tomatoes, locally grown', imageUrl: 'https://placehold.co/300x300/FEE2E2/DC2626?text=Tomatoes', price: 25, mrp: 35, unit: '500g', category: 'Vegetables', inStock: true, isDeal: false },
  { id: 15, storeId: 7, name: 'Amul Butter', description: 'Salted butter, rich and creamy', imageUrl: 'https://placehold.co/300x300/FEF9C3/CA8A04?text=Butter', price: 55, mrp: 60, unit: '100g', category: 'Dairy', inStock: true, isDeal: false },
  { id: 16, storeId: 7, name: 'Masala Chai', description: 'Premium tea leaves with spices', imageUrl: 'https://placehold.co/300x300/FEF3C7/D97706?text=Chai', price: 89, mrp: 110, unit: '250g', category: 'Beverages', inStock: true, isDeal: true, discountPercent: 19 },

  // Store 4 - Fresh Mart & Grocery
  { id: 17, storeId: 4, name: 'Organic Spinach', description: 'Fresh palak, pesticide-free', imageUrl: 'https://placehold.co/300x300/DCFCE7/16A34A?text=Spinach', price: 20, mrp: 30, unit: '250g', category: 'Vegetables', inStock: true, isDeal: false },
  { id: 18, storeId: 4, name: 'Paneer Fresh', description: 'Soft & creamy cottage cheese', imageUrl: 'https://placehold.co/300x300/DBEAFE/2563EB?text=Paneer', price: 90, mrp: 110, unit: '200g', category: 'Dairy', inStock: true, isDeal: false },
  { id: 19, storeId: 4, name: 'Basmati Rice', description: 'Long grain aged basmati', imageUrl: 'https://placehold.co/300x300/FEF9C3/CA8A04?text=Basmati', price: 189, mrp: 229, unit: '1 kg', category: 'Grocery', inStock: true, isDeal: true, discountPercent: 17 },
  { id: 20, storeId: 4, name: 'Toor Dal', description: 'Yellow split pigeon peas', imageUrl: 'https://placehold.co/300x300/FEF3C7/D97706?text=Dal', price: 115, mrp: 140, unit: '500g', category: 'Grocery', inStock: true, isDeal: false },
];
