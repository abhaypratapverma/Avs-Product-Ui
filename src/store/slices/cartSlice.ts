// src/store/slices/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../types/cart.types';
import type { Product } from '../../types/product.types';

export interface CartState {
  items: CartItem[];
  storeId: number | null;
  storeName: string | null;
  totalItems: number;
  totalAmount: number;
  // For cross-store cart detection
  pendingItem: { product: Product; storeName: string } | null;
}

function recalculate(items: CartItem[]): { totalItems: number; totalAmount: number } {
  return {
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    totalAmount: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  };
}

function loadFromStorage(): Partial<CartState> {
  try {
    const raw = localStorage.getItem('cart');
    if (raw) return JSON.parse(raw) as Partial<CartState>;
  } catch { /* ignore */ }
  return {};
}

const persisted = loadFromStorage();

const initialState: CartState = {
  items: persisted.items ?? [],
  storeId: persisted.storeId ?? null,
  storeName: persisted.storeName ?? null,
  totalItems: persisted.totalItems ?? 0,
  totalAmount: persisted.totalAmount ?? 0,
  pendingItem: null,
};

function persist(state: CartState): void {
  localStorage.setItem('cart', JSON.stringify({
    items: state.items,
    storeId: state.storeId,
    storeName: state.storeName,
    totalItems: state.totalItems,
    totalAmount: state.totalAmount,
  }));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Phase 1: addItem called as: dispatch(addItem({ product, storeName }))
    // If different store → sets pendingItem, does NOT add to cart
    // UI detects pendingItem and shows ConfirmModal
    addItem(state, action: PayloadAction<{ product: Product; storeName: string }>) {
      const { product, storeName } = action.payload;

      // Cross-store check
      if (state.storeId !== null && state.storeId !== product.storeId) {
        state.pendingItem = { product, storeName };
        return;
      }

      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: Date.now(),
          productId: product.id,
          storeId: product.storeId,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          unit: product.unit,
          quantity: 1,
        });
      }
      state.storeId = product.storeId;
      state.storeName = storeName;
      const { totalItems, totalAmount } = recalculate(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      persist(state);
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      if (state.items.length === 0) {
        state.storeId = null;
        state.storeName = null;
      }
      const { totalItems, totalAmount } = recalculate(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      persist(state);
    },

    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.productId !== productId);
        if (state.items.length === 0) { state.storeId = null; state.storeName = null; }
      } else {
        const item = state.items.find((i) => i.productId === productId);
        if (item) item.quantity = quantity;
      }
      const { totalItems, totalAmount } = recalculate(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      persist(state);
    },

    // Called when user confirms "replace cart"
    replaceCart(state) {
      if (!state.pendingItem) return;
      const { product, storeName } = state.pendingItem;
      state.items = [{
        id: Date.now(),
        productId: product.id,
        storeId: product.storeId,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        unit: product.unit,
        quantity: 1,
      }];
      state.storeId = product.storeId;
      state.storeName = storeName;
      state.pendingItem = null;
      const { totalItems, totalAmount } = recalculate(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      persist(state);
    },

    dismissPendingItem(state) {
      state.pendingItem = null;
    },

    clearCart(state) {
      state.items = [];
      state.storeId = null;
      state.storeName = null;
      state.totalItems = 0;
      state.totalAmount = 0;
      state.pendingItem = null;
      localStorage.removeItem('cart');
    },
  },
});

export const { addItem, removeItem, updateQuantity, replaceCart, dismissPendingItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
