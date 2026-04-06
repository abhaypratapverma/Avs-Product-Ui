// src/mock/categories.mock.ts
import type { Category } from '../types/store.types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'All Stores', icon: '🏪', slug: 'all' },
  { id: 2, name: 'Grocery',    icon: '🛒', slug: 'grocery' },
  { id: 3, name: 'Pharmacy',   icon: '💊', slug: 'pharmacy' },
  { id: 4, name: 'Electronics',icon: '📱', slug: 'electronics' },
  { id: 5, name: 'Fashion',    icon: '👗', slug: 'fashion' },
  { id: 6, name: 'Food',       icon: '🍱', slug: 'food' },
  { id: 7, name: 'Dairy',      icon: '🥛', slug: 'dairy' },
  { id: 8, name: 'Bakery',     icon: '🥐', slug: 'bakery' },
];
