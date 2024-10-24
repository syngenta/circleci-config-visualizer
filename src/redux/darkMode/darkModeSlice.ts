import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;
export const getDarkMode = (state: {darkMode: { darkMode: boolean }}) =>
  state.darkMode.darkMode;
export default darkModeSlice.reducer;
