export const ENDPOINTS = {
  auth: {
    sendOtp: '/auth/send-otp',
    verifyOtp: '/auth/verify-otp',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    me: '/auth/me',
    profileSetup: '/auth/profile-setup',
  },
  home: {
    banners: '/home/banners',
    shops: '/home/shops',
    categories: '/home/categories',
    merchants: '/home/top-merchants',
  },
  stores: {
    list: '/stores',
    detail: (id: number) => `/stores/${id}`,
    products: (id: number) => `/stores/${id}/products`,
  },
  cart: {
    get: '/cart',
    addItem: '/cart/items',
    updateItem: (id: number) => `/cart/items/${id}`,
    removeItem: (id: number) => `/cart/items/${id}`,
    clear: '/cart/clear',
  },
  orders: {
    place: '/orders',
    list: '/orders',
    detail: (id: number) => `/orders/${id}`,
  },
  address: {
    list: '/addresses',
    create: '/addresses',
    update: (id: number) => `/addresses/${id}`,
    delete: (id: number) => `/addresses/${id}`,
    setDefault: (id: number) => `/addresses/${id}/default`,
    getDefault: '/addresses/default',
  },
} as const;
