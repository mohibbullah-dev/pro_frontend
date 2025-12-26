import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  avatar: "",
  isLogedIn: false,
  loading: true,
  restaurantId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.restaurantId = action.payload.restaurantId;
      state.phone = action.payload?.phone;
      state.role = action.payload?.role;
      state.avatar = action.payload?.avatar;
      state.isLogedIn = true;
      state.loading = false;
    },
    removeUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.role = "";
      state.restaurantId = "";
      state.avatar = "";
      state.isLogedIn = false;
      state.loading = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
