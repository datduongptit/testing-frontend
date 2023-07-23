/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import UserService from 'services/user.service';

const initialState = {
  listProjects: null,
  currentProject: null,
  total: 0
};

const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setListProjects: (state, action) => {
      state.listProjects = action.payload.data;
      state.total = action.payload.total;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload.data;
    },
    updateProject: (state, action) => {
      state.listProjects = [action.payload.data, ...state.listProjects];
    },
    addUsersAssign: (state, action) => {
      state.currentProject.usersAssigned = action.payload;
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
    uploadFile: (state, action) => {
      const fileToAdd = action.payload.fileData;
      state.currentProject.files = [fileToAdd, ...state.currentProject.files];
    },
    deleteFileById: (state, action) => {
      const filesToDelete = [...state.currentProject.files];
      const idFileToDelete = action.payload;
      const filesAfterDelete = filesToDelete.filter((file) => file.id !== idFileToDelete);
      state.currentProject.files = filesAfterDelete;
    },

    clearMessage: () => {
      return { message: '' };
    }
  }
});

export default projects.reducer;

export const {
  setListProjects,
  setCurrentProject,
  updateProject,
  deleteProject,
  deteteUsersAssigned,
  addUsersAssign,
  deleteFileById,
  uploadFile,
  clearMessage
} = projects.actions;
