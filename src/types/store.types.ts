export interface Store {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  sponsoredBannerUrl?: string;
  districtCode: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  isSponsored: boolean;
  isFeatured: boolean;
  deliveryTime: string; // e.g. "30-45 min"
  deliveryFee: number;
  minOrderAmount: number;
  categories: Category[];
  address: string;
}

export interface Category {
  id: number;
  name: string;
  iconUrl?: string;
  slug: string;
}

export interface Banner {
  id: number;
  imageUrl: string;
  sponsoredImageUrl?: string;
  storeId?: number;
  linkUrl?: string;
  title?: string;
  districtCode: string;
}

export interface StoreFilters {
  category?: string;
  isOpen?: boolean;
  minRating?: number;
  deliveryType?: 'all' | 'free' | 'express';
  search?: string;
}
