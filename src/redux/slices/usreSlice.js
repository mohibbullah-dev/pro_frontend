import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  avatar: "",
  isLogedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.phone = action.payload?.phone;
      state.role = action.payload?.role;
      state.avatar = action.payload?.avatar;
      state.isLogedIn = action.payload?.isLogedIn;
    },
    removeUser: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.role = "";
      state.avatar = "";
      state.isLogedIn = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
