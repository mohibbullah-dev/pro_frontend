import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
  },
  devTools: import.meta.env.MODE !== "production", // better for Vite
});
