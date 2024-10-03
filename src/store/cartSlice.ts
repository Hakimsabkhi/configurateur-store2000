import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Export the CartItem interface
interface CartItem {
  id: string;
  devisNumber: string;
  totalHT: number;
  totalTTC: number;
  quantity: number;
  lameSelected: string;
  dimensions: {
    Largeur: number;
    Hauteur: number;
  };
  selectedColor: {
    coulisse: string;
    tablier: string;
    lameFinale: string;
  };
  poseInstalled: string;
  manoeuvreSelected: string;
  commandeManualSelected: string;
  optionMotorisationSelected: string;
  optionTelecomandeSelected: string;
  optionInterrupteurSelected: string;
  sortieDeCableSelected: string;
}

interface CartState {
  items: CartItem[];
}

// Load cart state from localStorage or use initialState if not available
const loadCartState = (): CartState => {
  try {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("cart");
      if (savedState) {
        return JSON.parse(savedState);
      }
    }
  } catch (error) {
    console.error('Error loading cart state:', error);
  }
  return { items: []};
};

const initialState: CartState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity; // If item already exists, update the quantity
      } else {
        state.items.push(action.payload); // Add new item if it doesn't exist
      }
      saveCartState(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartState(state);
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      saveCartState(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartState(state);
    },
  },
});

const saveCartState = (state: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart state:', error);
  }
};

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
