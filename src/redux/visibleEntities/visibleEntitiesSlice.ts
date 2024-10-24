import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  entities: {
    workflows: string[];
    jobs: string[];
    executors: string[];
    orbs: string[];
    commands: string[];
  };
};

const initialState: initialState = {
  entities: {
    workflows: [],
    jobs: [],
    executors: [],
    orbs: [],
    commands: [],
  },
};

const visibleEntitiesSlice = createSlice({
  name: "visibleEntities",
  initialState,
  reducers: {
    setWorkflowsVisible: (state, action) => {
      state.entities.workflows = action.payload;
    },
    setJobsVisible: (state, action) => {
      state.entities.jobs = action.payload;
    },
    setExecutorsVisible: (state, action) => {
      state.entities.executors = action.payload;
    },
    setOrbsVisible: (state, action) => {
      state.entities.orbs = action.payload;
    },
    setCommandsVisible: (state, action) => {
      state.entities.commands = action.payload;
    },
  },
});

export const {
  setWorkflowsVisible,
  setJobsVisible,
  setOrbsVisible,
  setCommandsVisible,
  setExecutorsVisible,
} = visibleEntitiesSlice.actions;
export const getVisibleJobs = (state: { visibleEntities: initialState }) =>
  state.visibleEntities.entities.jobs;
export const getVisibleWorkflows = (state: { visibleEntities: initialState }) =>
  state.visibleEntities.entities.workflows;
export const getVisibleOrbs = (state: { visibleEntities: initialState }) =>
  state.visibleEntities.entities.orbs;
export const getVisibleExecutors = (state: { visibleEntities: initialState }) =>
  state.visibleEntities.entities.executors;
export const getVisibleCommands = (state: { visibleEntities: initialState }) =>
  state.visibleEntities.entities.commands;
export default visibleEntitiesSlice.reducer;
