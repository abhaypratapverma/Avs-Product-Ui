// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import locationReducer from './slices/locationSlice';
import cartReducer from './slices/cartSlice';
import { homeApi } from '../api/services/homeApi';
import { storeApi } from '../api/services/storeApi';
import { orderApi } from '../api/services/orderApi';
import { authApi } from '../api/services/authApi';
import { addressApi } from '../api/services/addressApi';

const store = configureStore({
  reducer: {
    auth:     authReducer,
    location: locationReducer,
    cart:     cartReducer,
    [homeApi.reducerPath]:    homeApi.reducer,
    [storeApi.reducerPath]:   storeApi.reducer,
    [orderApi.reducerPath]:   orderApi.reducer,
    [authApi.reducerPath]:    authApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      homeApi.middleware,
      storeApi.middleware,
      orderApi.middleware,
      authApi.middleware,
      addressApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks — use these everywhere instead of useDispatch/useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector<RootState, T>(selector);

export default store;
