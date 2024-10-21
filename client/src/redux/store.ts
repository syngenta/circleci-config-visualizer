import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data/dataSlice";
import selectedEntityReducer from "./selectedEntity/selectedEntitySlice";
import activeEntityReducer from "./activeEntity/activeEntitySlice";
import visibleEntitiesReducer from "./visibleEntities/visibleEntitiesSlice";
import darkModeReducer from "./darkMode/darkModeSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    selectedEntity: selectedEntityReducer,
    activeEntity: activeEntityReducer,
    darkMode: darkModeReducer,
    visibleEntities: visibleEntitiesReducer,
  },
});

export default store;
