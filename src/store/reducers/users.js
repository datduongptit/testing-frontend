import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setListUsers: (state, action) => {
      // const response =
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: '' };
    }
  }
});

export default users.reducer;

export const { setListUsers, clearMessage } = users.actions;
