// src/api/services/addressApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosInstance } from '../axiosInstance';
import { ENDPOINTS } from '../endpoints';
import type { Address } from '../../types/api.types';
import { CONFIG } from '../../constants/config';

const USE_MOCK = CONFIG.useMock;

const MOCK_ADDRESSES: Address[] = [
  {
    id: 1, userId: 1, type: 'home',
    line1: '45, MG Road', line2: 'Hazratganj',
    city: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh',
    pincode: '226001', isDefault: true,
  },
  {
    id: 2, userId: 1, type: 'work',
    line1: 'Tech Park, Vibhuti Khand',
    city: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh',
    pincode: '226010', isDefault: false,
  },
];

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

async function del<T>(url: string) {
  try {
    const res = await axiosInstance.delete<T>(url);
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function patch<T>(url: string) {
  try {
    const res = await axiosInstance.patch<T>(url);
    return { data: res.data };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Address'],
  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      queryFn: async () => {
        if (USE_MOCK) return { data: MOCK_ADDRESSES };
        return get<Address[]>(ENDPOINTS.address.list);
      },
      providesTags: ['Address'],
    }),
    createAddress: builder.mutation<Address, Omit<Address, 'id' | 'userId'>>({
      queryFn: async (body) => {
        if (USE_MOCK) return { data: { ...body, id: Date.now(), userId: 1 } };
        return post<Address>(ENDPOINTS.address.create, body);
      },
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation<void, number>({
      queryFn: async (id) => {
        if (USE_MOCK) return { data: undefined };
        return del<void>(ENDPOINTS.address.delete(id));
      },
      invalidatesTags: ['Address'],
    }),
    setDefaultAddress: builder.mutation<void, number>({
      queryFn: async (id) => {
        if (USE_MOCK) return { data: undefined };
        return patch<void>(ENDPOINTS.address.setDefault(id));
      },
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
