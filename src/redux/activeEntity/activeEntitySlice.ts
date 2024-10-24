import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  entity: {},
};

const activeEntitySlice = createSlice({
  name: "activeEntity",
  initialState,
  reducers: {
    setActiveEntity: (state, action) => {
      state.type = action.payload.type;
      state.entity = action.payload.entity;
    },
  },
});

export const { setActiveEntity } = activeEntitySlice.actions;
export const getActiveEntity = (state: {
    activeEntity: { type: string; entity: any };
}) => state.activeEntity;
export default activeEntitySlice.reducer;
