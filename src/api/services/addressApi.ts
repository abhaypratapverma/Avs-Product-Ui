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
    const res = await axiosInstance.get<T>(url) as unknown as T;
    return { data: res };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function post<T>(url: string, body: unknown) {
  try {
    const res = await axiosInstance.post<T>(url, body) as unknown as T;
    return { data: res };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function put<T>(url: string, body: unknown) {
  try {
    const res = await axiosInstance.put<T>(url, body) as unknown as T;
    return { data: res };
  } catch (e) {
    const err = e as { message?: string };
    return { error: { message: err.message ?? 'Request failed', statusCode: 0, errors: [] } };
  }
}

async function delBody<T>(url: string, body: unknown) {
  try {
    const res = await axiosInstance.delete<T>(url, { data: body }) as unknown as T;
    return { data: res };
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
        const response = await get<any[]>(ENDPOINTS.address.list);
        if ('error' in response) return response;
        const mapped = response.data.map((item: any) => ({
          id: item.id,
          userId: 1, // Phase 1 mock
          type: item.isDefault ? 'home' : 'other', // Try to derive type
          line1: item.street,
          city: item.city,
          district: item.districtCode || item.city,
          state: item.state,
          pincode: item.zipCode,
          isDefault: item.isDefault,
        }));
        return { data: mapped as Address[] };
      },
      providesTags: ['Address'],
    }),
    createAddress: builder.mutation<Address, Omit<Address, 'id' | 'userId'>>({
      queryFn: async (body) => {
        if (USE_MOCK) return { data: { ...body, id: Date.now(), userId: 1 } };
        const payload = {
          street: `${body.line1} ${body.line2 ?? ''}`.trim(),
          city: body.city,
          state: body.state,
          zipCode: body.pincode,
          country: 'IN', // Defaulting as per curl example
        };
        return post<Address>(ENDPOINTS.address.create, payload);
      },
      invalidatesTags: ['Address'],
    }),
    updateAddress: builder.mutation<Address, Address>({
      queryFn: async (body) => {
        if (USE_MOCK) return { data: body };
        const payload = {
          addressId: body.id,
          street: `${body.line1} ${body.line2 ?? ''}`.trim(),
          city: body.city,
          state: body.state,
          zipCode: body.pincode,
          country: 'IN',
        };
        return put<Address>(ENDPOINTS.address.update, payload);
      },
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation<void, number>({
      queryFn: async (id) => {
        if (USE_MOCK) return { data: undefined };
        return delBody<void>(ENDPOINTS.address.delete, { id });
      },
      invalidatesTags: ['Address'],
    }),
    setDefaultAddress: builder.mutation<void, number>({
      queryFn: async (id) => {
        if (USE_MOCK) return { data: undefined };
        return put<void>(ENDPOINTS.address.setDefault, { id });
      },
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
