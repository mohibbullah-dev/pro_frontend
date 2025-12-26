import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/usreSlice";
import restaurantSlice from "./slices/restaurantSlice";
import menuSlice from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    customer: customerSlice,
    cart: cartSlice,
    auth: authSlice,
    user: userSlice,
    menu: menuSlice,
  },
  devTools: import.meta.env.MODE !== "production", // better for Vite
});
