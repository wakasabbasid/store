import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_ENDPOINT = process.env.REACT_APP_API_URL || "";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(API_ENDPOINT);
    const data: Product[] = await response.json();
    return data;
  },
);

const apiSlice = createSlice({
  name: "api",
  initialState: { products: [] as Product[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default apiSlice.reducer;
