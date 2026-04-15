// src/hooks/useCart.ts
import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../store';
import { addItem, removeItem, updateQuantity, replaceCart, dismissPendingItem, clearCart } from '../store/slices/cartSlice';
import type { Product } from '../types/product.types';
import { axiosInstance } from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';
import { CONFIG } from '../constants/config';

export function useCart() {
  const dispatch = useAppDispatch();
  const { items, storeId, storeName, totalItems, totalAmount, pendingItem } = useAppSelector((s) => s.cart);

  const addToCart = async (product: Product, storeNameParam: string) => {
    if (storeId !== null && storeId !== product.storeId) {
      dispatch(addItem({ product, storeName: storeNameParam }));
      return;
    }

    const existing = items.find((i) => i.productId === product.id);
    const oldQuantity = existing?.quantity || 0;
    const newQty = oldQuantity + 1;

    dispatch(addItem({ product, storeName: storeNameParam }));

    if (!CONFIG.useMock) {
      try {
        const res = await axiosInstance.post(ENDPOINTS.cart.add, {
          productId: product.id,
          storeId: product.storeId,
          quantity: 1,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resData = res as any;
        if (resData && 'success' in resData && resData.success === false) {
          toast.error(resData.message || 'Failed to add item');
          dispatch(updateQuantity({ productId: product.id, quantity: oldQuantity }));
        } else if (!existing) {
          toast.success(resData?.message || 'Item added to cart successfully');
        }
      } catch (e: any) {
        const errMsg = e?.response?.data?.message || e?.message || 'Failed to add item';
        toast.error(errMsg);
        dispatch(updateQuantity({ productId: product.id, quantity: oldQuantity }));
      }
    }
  };

  const user = useAppSelector((s) => s.auth.user);

  const removeFromCart = async (productId: number) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    if (!CONFIG.useMock) {
      try {
        await axiosInstance.post(ENDPOINTS.cart.remove, {
          productId,
          storeId: item.storeId,
          userId: user?.id,
        });
      } catch (e: any) {
        const errMsg = e?.response?.data?.message || e?.message || 'Failed to remove item';
        toast.error(errMsg);
        dispatch(addItem({ product: item as any, storeName: storeName || '' })); // basic fallback
        return;
      }
    }
    dispatch(removeItem(productId));
  };

  const setQuantity = async (productId: number, quantity: number) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;
    const oldQuantity = item.quantity;

    if (quantity <= 0) {
      void removeFromCart(productId);
      return;
    }

    dispatch(updateQuantity({ productId, quantity }));

    if (!CONFIG.useMock) {
      try {
        const res = await axiosInstance.put(ENDPOINTS.cart.updateQty, {
          productId,
          storeId: item.storeId,
          quantity,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resData = res as any;
        if (resData && 'success' in resData && resData.success === false) {
          toast.error(resData.message || 'Failed to update item');
          dispatch(updateQuantity({ productId, quantity: oldQuantity }));
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const errMsg = e?.response?.data?.message || e?.message || 'Failed to update item';
        toast.error(errMsg);
        dispatch(updateQuantity({ productId, quantity: oldQuantity }));
      }
    }
  };

  const confirmReplaceCart = () => {
    dispatch(replaceCart());
  };

  const cancelReplaceCart = () => {
    dispatch(dismissPendingItem());
  };

  const emptyCart = async () => {
    if (!CONFIG.useMock) {
      try {
        await axiosInstance.delete(ENDPOINTS.cart.clear);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        toast.error(e?.message || 'Failed to clear cart');
        return;
      }
    }
    dispatch(clearCart());
  };

  const getItemQuantity = (productId: number): number => {
    return items.find((i) => i.productId === productId)?.quantity ?? 0;
  };

  return {
    items,
    storeId,
    storeName,
    totalItems,
    totalAmount,
    pendingItem,
    addToCart,
    removeFromCart,
    setQuantity,
    confirmReplaceCart,
    cancelReplaceCart,
    emptyCart,
    getItemQuantity,
  };
}
