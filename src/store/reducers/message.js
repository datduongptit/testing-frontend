import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const message = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      // const res = await
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: '' };
    }
  }
});

export default message.reducer;

export const { setMessage, clearMessage } = message.actions;
