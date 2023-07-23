import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  active: false,
  type: 'success',
  vertical: 'bottom',
  horizontal: 'center'
};

const message = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      // const res = await
      state.active = true;
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = '';
      state.active = false;
    }
  }
});

export default message.reducer;

export const { setMessage, clearMessage } = message.actions;
