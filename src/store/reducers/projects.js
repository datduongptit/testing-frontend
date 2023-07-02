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
    updateProject: (state, action) => {
      state.listProjects = [action.payload.data, ...state.listProjects];
    },
    deteteUsersAssigned: (state, action) => {
      const usersAssigned = [...state.currentProject.usersAssigned];
      const idUserAssignDelete = action.payload;
      const listUsersAssignedAfterDelete = usersAssigned.filter((user) => user.id !== idUserAssignDelete);
      state.currentProject.usersAssigned = [...listUsersAssignedAfterDelete];
    },
    deleteProject: (state, action) => {
      const listProjects = [...state.listProjects];
      const idToDelete = action.payload;
      const listProjectAfterDelete = listProjects.filter((project) => project.id !== idToDelete);
      state.listProjects = [...listProjectAfterDelete];
    },

    clearMessage: () => {
      return { message: '' };
    }
  }
});

export default projects.reducer;

export const { setListProjects, setCurrentProject, updateProject, deleteProject, deteteUsersAssigned, clearMessage } = projects.actions;
