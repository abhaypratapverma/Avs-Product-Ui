// Maps customer public / customer resource API payloads to app types (handles PascalCase fields).
import type { Banner, Category, Merchant, Store } from '../../types/store.types';
import type { Product } from '../../types/product.types';

function str(v: unknown): string {
  if (v == null) return '';
  return String(v);
}

function num(v: unknown, fallback = 0): number {
  if (v == null || v === '') return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/** First non-empty value for any of the keys (case-insensitive key match on object). */
export function pickField(obj: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      const v = obj[k];
      if (v != null && v !== '') return v;
    }
    const found = Object.keys(obj).find((ok) => ok.toLowerCase() === k.toLowerCase());
    if (found) {
      const v = obj[found];
      if (v != null && v !== '') return v;
    }
  }
  return undefined;
}

function parseTags(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => str(x)).filter(Boolean);
  if (typeof v === 'string' && v.trim()) {
    return v.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

const CATEGORY_ICONS: Record<string, string> = {
  grocery: '🛒',
  electronics: '📱',
  fashion: '👗',
  beauty: '💄',
  books: '📚',
  sports: '⚽',
  'home & kitchen': '🏠',
  toys: '🧸',
  'action figures': '🦸',
  puzzles: '🧩',
};

export function mapApiBanner(raw: Record<string, unknown>, districtCode: string): Banner {
  const name = str(pickField(raw, 'name'));
  const bannerUrl = str(pickField(raw, 'bannerUrl', 'BannerUrl'));
  const id = num(raw['id']);
  return {
    id,
    storeId: id,
    storeName: '',
    imageUrl: bannerUrl,
    tagLine: name,
    ctaText: '',
    isSponsored: Boolean(raw['isSponsored']),
    districtCode,
  };
}

export function mapApiShopToStore(raw: Record<string, unknown>): Store {
  const name = str(pickField(raw, 'name'));
  const category = str(pickField(raw, 'Category', 'category'));
  const slugFromApi = str(pickField(raw, 'slug'));
  const slug =
    slugFromApi ||
    name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') ||
    `store-${raw['id']}`;
  const minRaw = pickField(raw, 'MinimumOrderAmount', 'minimumOrder');
  const openVal = pickField(raw, 'isOpen', 'IsOpen');
  return {
    id: num(raw['id']),
    name,
    slug,
    districtCode: str(pickField(raw, 'districtCode')),
    logoUrl: str(pickField(raw, 'logoUrl', 'LogoUrl')),
    bannerUrl: str(pickField(raw, 'BannerUrl', 'bannerUrl')),
    tagLine: str(pickField(raw, 'tagLine', 'TagLine')),
    category,
    rating: num(pickField(raw, 'rating'), 4.2),
    reviewCount: num(pickField(raw, 'reviewCount'), 0),
    isOpen: openVal === undefined ? true : Boolean(openVal),
    deliveryTime: str(pickField(raw, 'EstimatedDeliveryTime', 'deliveryTime')) || '—',
    minimumOrder: num(minRaw, 0),
    deliveryFee: num(pickField(raw, 'deliveryFee'), 0),
    isFeatured: Boolean(pickField(raw, 'isFeatured', 'IsFeatured')),
    isSponsored: Boolean(pickField(raw, 'isSponsored', 'IsSponsored')),
    tags: parseTags(pickField(raw, 'tags', 'Tags')),
    city: str(pickField(raw, 'city', 'City')) || str(pickField(raw, 'districtCode')),
    address: str(pickField(raw, 'address', 'Address')) || undefined,
    distanceKm: pickField(raw, 'distanceKm', 'DistanceKm') != null ? num(pickField(raw, 'distanceKm', 'DistanceKm')) : undefined,
    phone: str(pickField(raw, 'phone', 'Phone')) || undefined,
    openUntil: str(pickField(raw, 'openUntil', 'OpenUntil')) || undefined,
  };
}

export function mapApiCategory(raw: Record<string, unknown>): Category {
  const name = str(pickField(raw, 'name'));
  const slug = str(pickField(raw, 'slug')) || name.toLowerCase().replace(/\s+/g, '-');
  const key = name.toLowerCase();
  const icon = CATEGORY_ICONS[key] ?? '📦';
  const parentId = raw['parentId'] as number | null | undefined;
  return {
    id: num(raw['id']),
    name,
    slug,
    icon,
    parentId: parentId === undefined ? null : parentId,
  };
}

export function mapApiMerchant(raw: Record<string, unknown>): Merchant {
  const user = raw['user'] as Record<string, unknown> | undefined;
  const name =
    str(pickField(raw, 'businessName', 'name')) || str(user?.['name']);
  return {
    id: num(raw['id']),
    name,
    avatarUrl: str(pickField(raw, 'logoUrl', 'avatarUrl')),
    storeCount: num(pickField(raw, 'storeCount'), 0),
    category: str(pickField(raw, 'category')),
  };
}

export function mapApiProduct(raw: Record<string, unknown>, storeId: number): Product {
  const images = raw['images'] as { url?: string }[] | undefined;
  const imageUrl = images?.[0]?.url ?? '';
  const price = num(pickField(raw, 'price'), 0);
  const cost = num(pickField(raw, 'CostPrice', 'costPrice', 'mrp'), price);
  const mrp = cost >= price ? cost : price;
  const cat = raw['category'] as Record<string, unknown> | undefined;
  const inv = raw['storeInventory'] as { storeId?: number; quantity?: number; reserved?: number }[] | undefined;
  let inStock = true;
  if (Array.isArray(inv) && inv.length > 0) {
    const row = inv.find((r) => r.storeId === storeId) ?? inv[0];
    if (row) {
      const qty = num(row.quantity, 0);
      const res = num(row.reserved, 0);
      inStock = qty - res > 0;
    }
  }
  const desc = raw['description'];
  const brandObj = raw['brand'] as Record<string, unknown> | undefined;
  return {
    id: num(raw['id']),
    storeId,
    name: str(pickField(raw, 'name')),
    description: desc == null ? '' : String(desc),
    imageUrl,
    price,
    mrp,
    unit: str(pickField(raw, 'Unit', 'unit')) || '1 pc',
    category: str(cat?.['name']),
    inStock,
    isDeal: mrp > price,
    discountPercent: mrp > price ? Math.round(((mrp - price) / mrp) * 100) : undefined,
    brand: str(brandObj?.['name']) || undefined,
  };
}
