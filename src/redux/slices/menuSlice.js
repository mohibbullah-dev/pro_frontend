import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  color: "",
  icon: "",
  dishes: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.name = action?.payload?.name;
      state.color = action?.payload?.name;
      state.icon = action?.payload?.icon;
      state.dishes = action?.payload?.dishes;
    },
    removeMenu: (state) => {
      state.name = "";
      state.color = "";
      state.icon = "";
      state.dishes = [];
    },
  },
});

export const { setMenu, removeMenu } = menuSlice.actions;
export default menuSlice.reducer;
