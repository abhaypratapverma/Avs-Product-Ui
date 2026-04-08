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
    banner: (districtCode: string) =>
      `/customer/public/home/banner/${encodeURIComponent(districtCode)}`,
    categoriesShops: '/customer/public/home/categories-shops',
    shops: (districtCode: string) =>
      `/customer/public/home/shops/${encodeURIComponent(districtCode)}`,
    topMerchants: (districtCode: string) =>
      `/customer/public/home/top-merchants/${encodeURIComponent(districtCode)}`,
  },
  customer: {
    storeById: (storeId: number) => `/customer/${storeId}/stores`,
    productsByStoreId: (storeId: number) => `/customer/${storeId}/products`,
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
