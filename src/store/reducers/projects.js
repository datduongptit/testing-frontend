/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import UserService from 'services/user.service';

const initialState = {
  listProjects: null,
  currentProject: null
};

const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setListProjects: (state, action) => {
      state.listProjects = action.payload.data;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload.data;
    },
    clearMessage: () => {
      return { message: '' };
    }
  }
});

export default projects.reducer;

export const { setListProjects, setCurrentProject, clearMessage } = projects.actions;
