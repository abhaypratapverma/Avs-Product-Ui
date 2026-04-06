// src/mock/merchants.mock.ts
import type { Merchant } from '../types/store.types';

export const MOCK_MERCHANTS: Merchant[] = [
  { id: 1, name: 'Organic Hub',  avatarUrl: 'https://placehold.co/60x60/16A34A/FFFFFF?text=OH', storeCount: 3, category: 'Grocery' },
  { id: 2, name: "Sister's Bay", avatarUrl: 'https://placehold.co/60x60/EC4899/FFFFFF?text=SB', storeCount: 2, category: 'Fashion' },
  { id: 3, name: 'Tech World',   avatarUrl: 'https://placehold.co/60x60/2563EB/FFFFFF?text=TW', storeCount: 4, category: 'Electronics' },
  { id: 4, name: 'Pet Palace',   avatarUrl: 'https://placehold.co/60x60/F97316/FFFFFF?text=PP', storeCount: 1, category: 'Pets' },
  { id: 5, name: 'Flavour Co.',  avatarUrl: 'https://placehold.co/60x60/7C3AED/FFFFFF?text=FC', storeCount: 2, category: 'Food' },
];
