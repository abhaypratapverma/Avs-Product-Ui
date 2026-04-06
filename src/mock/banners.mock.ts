// src/mock/banners.mock.ts
import type { Banner } from '../types/store.types';

export const MOCK_BANNERS: Banner[] = [
  {
    id: 1,
    storeId: 1,
    storeName: 'Hazratganj Central Mart',
    imageUrl: 'https://placehold.co/400x180/16A34A/FFFFFF?text=Up+to+40%25+OFF+on+Fresh+Greens',
    tagLine: 'Up to 40% OFF on Fresh Greens',
    ctaText: 'Shop Now',
    isSponsored: false,
    districtCode: 'Lucknow',
  },
  {
    id: 2,
    storeId: 2,
    storeName: 'The Gadget Loft',
    imageUrl: 'https://placehold.co/400x180/1E293B/F97316?text=New+Arrivals+in+Electronics',
    tagLine: 'New Arrivals — Gadgets & Accessories',
    ctaText: 'Explore',
    isSponsored: true,
    districtCode: 'Lucknow',
  },
  {
    id: 3,
    storeId: 3,
    storeName: 'Wellness First Pharma',
    imageUrl: 'https://placehold.co/400x180/2563EB/FFFFFF?text=Free+Delivery+on+Medicines',
    tagLine: 'Free Delivery on all Medicines',
    ctaText: 'Order Now',
    isSponsored: false,
    districtCode: 'Lucknow',
  },
  {
    id: 4,
    storeId: 7,
    storeName: 'Daily Fresh Grocery',
    imageUrl: 'https://placehold.co/400x180/F97316/FFFFFF?text=Daily+Fresh+Produce',
    tagLine: 'Farm-fresh produce every morning',
    ctaText: 'Shop Fresh',
    isSponsored: false,
    districtCode: 'Lucknow',
  },
];
