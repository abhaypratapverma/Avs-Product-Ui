import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/product.types';

interface CartState {
  items: CartItem[];
  storeId: number | null;
  storeName: string | null;
  totalItems: number;
  totalAmount: number;
  // Modal state for store switch confirmation
  pendingItem: CartItem | null;
  showStoreSwitchModal: boolean;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  // Store-switch modal actions
  confirmStoreSwitch: () => void;
  cancelStoreSwitch: () => void;
}

type CartStore = CartState & CartActions;

function computeTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
    totalAmount: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      storeId: null,
      storeName: null,
      totalItems: 0,
      totalAmount: 0,
      pendingItem: null,
      showStoreSwitchModal: false,

      addItem: (item) => {
        const { items, storeId } = get();

        // If cart belongs to a different store — prompt switch
        if (storeId !== null && storeId !== item.storeId) {
          set({ pendingItem: item, showStoreSwitchModal: true });
          return;
        }

        const existing = items.find((i) => i.productId === item.productId);
        let updatedItems: CartItem[];

        if (existing) {
          updatedItems = items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          updatedItems = [...items, item];
        }

        set({
          items: updatedItems,
          storeId: item.storeId,
          ...computeTotals(updatedItems),
        });
      },

      removeItem: (productId) => {
        const updatedItems = get().items.filter((i) => i.productId !== productId);
        const storeId = updatedItems.length > 0 ? get().storeId : null;
        const storeName = updatedItems.length > 0 ? get().storeName : null;
        set({ items: updatedItems, storeId, storeName, ...computeTotals(updatedItems) });
      },

      updateQuantity: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        const updatedItems = get().items.map((i) =>
          i.productId === productId ? { ...i, quantity: qty } : i
        );
        set({ items: updatedItems, ...computeTotals(updatedItems) });
      },

      clearCart: () => {
        set({
          items: [],
          storeId: null,
          storeName: null,
          totalItems: 0,
          totalAmount: 0,
          pendingItem: null,
          showStoreSwitchModal: false,
        });
      },

      confirmStoreSwitch: () => {
        const { pendingItem } = get();
        if (!pendingItem) return;
        const newItems = [pendingItem];
        set({
          items: newItems,
          storeId: pendingItem.storeId,
          storeName: null,
          pendingItem: null,
          showStoreSwitchModal: false,
          ...computeTotals(newItems),
        });
      },

      cancelStoreSwitch: () => {
        set({ pendingItem: null, showStoreSwitchModal: false });
      },
    }),
    {
      name: 'avs-cart',
      partialize: (state) => ({
        items: state.items,
        storeId: state.storeId,
        storeName: state.storeName,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      }),
    }
  )
);
