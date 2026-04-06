import { useCartStore } from '@/store/cartStore';
import type { CartItem } from '@/types/product.types';

export function useCart() {
  const {
    items,
    storeId,
    storeName,
    totalItems,
    totalAmount,
    showStoreSwitchModal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    confirmStoreSwitch,
    cancelStoreSwitch,
  } = useCartStore();

  function getItemQuantity(productId: number): number {
    return items.find((i) => i.productId === productId)?.quantity ?? 0;
  }

  function isInCart(productId: number): boolean {
    return items.some((i) => i.productId === productId);
  }

  return {
    items,
    storeId,
    storeName,
    totalItems,
    totalAmount,
    showStoreSwitchModal,
    addItem: (item: CartItem) => addItem(item),
    removeItem,
    updateQuantity,
    clearCart,
    confirmStoreSwitch,
    cancelStoreSwitch,
    getItemQuantity,
    isInCart,
    isEmpty: items.length === 0,
  };
}
