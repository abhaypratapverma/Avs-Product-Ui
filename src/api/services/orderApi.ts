// src/api/services/orderApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from '../axiosInstance';
import { ENDPOINTS } from '../endpoints';
import type { Order } from '../../types/order.types';
import { MOCK_ORDERS } from '../../mock/orders.mock';
import { CONFIG } from '../../constants/config';

const USE_MOCK = CONFIG.useMock;

async function get<T>(url: string) {
  try {
    const res = await axiosInstance.get<T>(url);
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function post<T>(url: string, body: unknown) {
  try {
    const res = await axiosInstance.post<T>(url, body);
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      queryFn: async () => {
        if (USE_MOCK) return { data: MOCK_ORDERS };
        return get<Order[]>(ENDPOINTS.orders.list);
      },
      providesTags: ['Order'],
    }),
    getOrderDetail: builder.query<Order, number>({
      queryFn: async (id) => {
        if (USE_MOCK) {
          const order = MOCK_ORDERS.find((o) => o.id === id);
          if (!order) return { error: { message: 'Order not found', statusCode: 404, errors: [] } };
          return { data: order };
        }
        return get<Order>(ENDPOINTS.orders.detail(id));
      },
    }),
    placeOrder: builder.mutation<Order, { storeId: number; addressId: number; paymentMethod: 'cod' | 'online' }>({
      queryFn: async (body) => {
        if (USE_MOCK) {
          const newOrder: Order = {
            id: Date.now(),
            orderId: `AVS-2024-${Date.now().toString().slice(-5)}`,
            storeId: body.storeId,
            storeName: 'Mock Store',
            storeLogo: 'https://placehold.co/60x60',
            items: [],
            status: 'confirmed',
            totalAmount: 0,
            deliveryFee: 0,
            totalItems: 0,
            deliveryAddress: 'Mock Address',
            placedAt: new Date().toISOString(),
            paymentMethod: body.paymentMethod,
            isActive: true,
          };
          return { data: newOrder };
        }
        return post<Order>(ENDPOINTS.orders.place, body);
      },
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderDetailQuery, usePlaceOrderMutation } = orderApi;
