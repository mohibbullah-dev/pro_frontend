import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
    auth: authSlice,
  },
  devTools: import.meta.env.MODE !== "production", // better for Vite
});
