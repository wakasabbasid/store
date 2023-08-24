import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload),
      ];
    },
  },
});

export const { updateCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
