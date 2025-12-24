import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  logo: "",
  email: "",
  phone: "",
  status: "",
  currency: "",
  openingOpen: "",
  openingClose: "",
  taxPercent: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurantInfo: (state, action) => {
      state.name = action.payload.name;
      state.logo = action.payload.logo;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.status = action.payload.status;
      state.currency = action.payload.currency;
      state.openingOpen = action.payload.openingOpen;
      state.openingClose = action.payload.openingClose;
      state.taxPercent = action.payload.taxPercent;
    },

    removeRestaurantInfo: (state) => {
      state.name = "";
      state.logo = "";
      state.email = "";
      state.phone = "";
      state.status = "";
      state.currency = "";
      state.openingOpen = "";
      state.openingClose = "";
      state.taxPercent = null;
    },
  },
});

export const { setRestaurantInfo, removeRestaurantInfo } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
