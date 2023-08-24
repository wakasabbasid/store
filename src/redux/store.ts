import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import cartReducer from "./cartSlice";

export const rootReducer = combineReducers({
  api: apiReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
