// src/types/store.types.ts

export interface Store {
  id: number;
  name: string;
  slug: string;
  districtCode: string;
  logoUrl: string;
  bannerUrl: string;
  tagLine: string;
  category: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
  isFeatured: boolean;
  isSponsored: boolean;
  tags: string[];
  city: string;
  address?: string;
  distanceKm?: number;
  phone?: string;
  openUntil?: string;
}

export interface Banner {
  id: number;
  storeId: number;
  storeName: string;
  imageUrl: string;
  tagLine: string;
  ctaText: string;
  isSponsored: boolean;
  districtCode: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

export interface Merchant {
  id: number;
  name: string;
  avatarUrl: string;
  storeCount: number;
  category: string;
}
