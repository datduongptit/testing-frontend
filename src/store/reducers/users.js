/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import UserService from 'services/user.service';

const initialState = {
  listUsers: null,
  currentUserInfo: null
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setListUsers: (state, action) => {
      state.listUsers = action.payload.data;
    },
    setCurrenUserInfo: (state, action) => {
      state.currentUserInfo = action.payload.data;
    },
    clearMessage: () => {
      return { message: '' };
    }
  }
});

export default users.reducer;

export const { setListUsers, setCurrenUserInfo, clearMessage } = users.actions;
