// src/hooks/useCart.ts
import { useAppSelector, useAppDispatch } from '../store';
import { addItem, removeItem, updateQuantity, replaceCart, dismissPendingItem, clearCart } from '../store/slices/cartSlice';
import type { Product } from '../types/product.types';

export function useCart() {
  const dispatch = useAppDispatch();
  const { items, storeId, storeName, totalItems, totalAmount, pendingItem } = useAppSelector((s) => s.cart);

  const addToCart = (product: Product, storeNameParam: string) => {
    dispatch(addItem({ product, storeName: storeNameParam }));
  };

  const removeFromCart = (productId: number) => {
    dispatch(removeItem(productId));
  };

  const setQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const confirmReplaceCart = () => {
    dispatch(replaceCart());
  };

  const cancelReplaceCart = () => {
    dispatch(dismissPendingItem());
  };

  const emptyCart = () => {
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
