// src/constants/routes.ts

export const ROUTES = {
  locationSetup:     '/location-setup',
  login:             '/login',
  register:          '/register',
  profileSetup:      '/profile-setup',
  home:              '/',
  explore:           '/explore',
  search:            '/search',
  storeDetail:       '/stores/:storeId',
  cart:              '/cart',
  orderConfirmation: '/order-confirmation/:orderId',
  orders:            '/orders',
  orderDetail:       '/orders/:orderId',
  profile:           '/profile',
  addresses:         '/addresses',
  comingSoon:        '/coming-soon',
} as const;

export type RouteKey = keyof typeof ROUTES;

// Helper: replace params in route paths for navigation
export const buildRoute = {
  storeDetail:       (storeId: number | string) => `/stores/${storeId}`,
  orderDetail:       (orderId: number | string) => `/orders/${orderId}`,
  orderConfirmation: (orderId: number | string) => `/order-confirmation/${orderId}`,
} as const;
