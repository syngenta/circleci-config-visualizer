import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  entity: {},
};

const selectedEntitySlice = createSlice({
  name: "selectedEntity",
  initialState,
  reducers: {
    setSelectedEntity: (state, action) => {
      state.type = action.payload.type;
      state.entity = action.payload.entity;
    },
  },
});

export const { setSelectedEntity } = selectedEntitySlice.actions;
export const getSelectedEntity = (state: {
  selectedEntity: { type: string; entity: any };
}) => state.selectedEntity;
export default selectedEntitySlice.reducer;
