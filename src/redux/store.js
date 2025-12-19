import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/usreSlice";

export const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
    auth: authSlice,
    user: userSlice,
  },
  devTools: import.meta.env.MODE !== "production", // better for Vite
});
