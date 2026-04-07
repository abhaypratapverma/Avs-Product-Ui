// src/api/endpoints.ts

export const ENDPOINTS = {
  auth: {
    register:   '/auth/register',
    verifyUser: '/auth/verify_user',
    login:      '/auth/login',
    refresh:    '/auth/refresh-token',
    logout:     '/auth/logout',
    me:         '/auth/me', // We can keep or update this later
  },
  home: {
    banners:    '/home/banners',
    shops:      '/home/shops',
    categories: '/home/categories',
    merchants:  '/home/top-merchants',
  },
  stores: {
    list:       '/stores',
    detail:     (id: number) => `/stores/${id}`,
    products:   (id: number) => `/stores/${id}/products`,
  },
  cart: {
    get:        '/cart',
    addItem:    '/cart/items',
    updateItem: (id: number) => `/cart/items/${id}`,
    removeItem: (id: number) => `/cart/items/${id}`,
    clear:      '/cart/clear',
  },
  orders: {
    place:      '/orders',
    list:       '/orders',
    detail:     (id: number) => `/orders/${id}`,
  },
  address: {
    list:       '/customer/user/addresses',
    create:     '/customer/user/addresses/add',
    update:     '/customer/user/addresses/update',
    delete:     '/customer/user/addresses/delete',
    setDefault: '/customer/user/addresses/default',
    getDefault: '/customer/user/addresses/default', // Adjust if you have a distinct get route
  },
} as const;
