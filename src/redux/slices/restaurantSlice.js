import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  status: "",
  address: "",
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
      state.name = action?.payload?.name;
      state.email = action?.payload?.contact?.email;
      state.phone = action?.payload?.contact?.phone;
      state.status = action?.payload?.status;
      state.address = action?.payload?.address;
      state.currency = action?.payload?.currency;
      state.openingOpen = action?.payload?.openingHours?.open;
      state.openingClose = action?.payload?.openingHours?.close;
      state.taxPercent = action?.payload?.taxPercent;
    },

    removeRestaurantInfo: (state) => {
      state.name = "";
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
