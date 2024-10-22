import { createSlice } from "@reduxjs/toolkit";
import objToArrayConverter from "../../utils/objToArrayConverter";

const initialState = {
  data: {
    executors: [],
    orbs: [],
    commands: [],
    jobs: [],
    workflows: [],
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataReducer: (state, action) => {
      state.data = action.payload;
    },
    setExecutorsReducer: (state, action) => {
      state.data.executors = action.payload;
    },
    setOrbsReducer: (state, action) => {
      state.data.orbs = action.payload;
    },
    setCommandsReducer: (state, action) => {
      state.data.commands = action.payload;
    },
    setJobsReducer: (state, action) => {
      state.data.jobs = action.payload;
    },
    setWorkflowsReducer: (state, action) => {
      state.data.workflows = action.payload;
    },
  },
});

const getAllExecutors = (state: { data: { data: { executors: any[] } } }) =>
  objToArrayConverter(state.data.data.executors);
const getAllOrbs = (state: { data: { data: { orbs: any[] } } }) =>
  objToArrayConverter(state.data.data.orbs);
const getAllCommands = (state: { data: { data: { commands: any[] } } }) =>
  objToArrayConverter(state.data.data.commands);
const getAllJobs = (state: { data: { data: { jobs: any[] } } }) =>
  objToArrayConverter(state.data.data.jobs);
const getAllWorkflows = (state: { data: { data: { workflows: any[] } } }) =>
  objToArrayConverter(state.data.data.workflows);

export const {
  setDataReducer,
  setExecutorsReducer,
  setOrbsReducer,
  setCommandsReducer,
  setJobsReducer,
  setWorkflowsReducer,
} = dataSlice.actions;
export const getData = (state: { data: { data: any } }) => state.data.data;
export {
  getAllExecutors,
  getAllOrbs,
  getAllCommands,
  getAllJobs,
  getAllWorkflows,
};
export default dataSlice.reducer;
