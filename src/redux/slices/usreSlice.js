import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
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
      state.id = action.payload.id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.phone = action.payload?.phone;
      state.role = action.payload?.role;
      state.avatar = action.payload?.avatar;
      state.isLogedIn = true;
    },
    removeUser: (state) => {
      state.id = "";
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
