import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  githubData: {}
};

const githubDataSlice = createSlice({
  name: "githubData",
  initialState,
  reducers: {
    setGithubData: (state, action) => {
      state.githubData = JSON.parse(action.payload);
    },
  },
});

export const { setGithubData } = githubDataSlice.actions;
export const getGithubData = (state: {githubData: { githubData: any }}) =>
  state.githubData.githubData;
export default githubDataSlice.reducer;
