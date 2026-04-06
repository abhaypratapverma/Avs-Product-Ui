export const ROUTES = {
  // Public
  LOCATION_SETUP: '/location-setup',
  LOGIN: '/login',
  PROFILE_SETUP: '/profile-setup',

  // Guest allowed
  HOME: '/',
  EXPLORE: '/explore',
  SEARCH: '/search',
  STORE_DETAIL: '/stores/:storeId',
  COMING_SOON: '/coming-soon',

  // Auth required
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation/:id',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  PROFILE: '/profile',
  ADDRESSES: '/addresses',
} as const;

export function storeDetailPath(storeId: number | string) {
  return `/stores/${storeId}`;
}

export function orderConfirmationPath(orderId: number | string) {
  return `/order-confirmation/${orderId}`;
}

export function orderDetailPath(orderId: number | string) {
  return `/orders/${orderId}`;
}
