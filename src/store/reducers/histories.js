import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  histories: null,
  total: 0
};

const histories = createSlice({
  name: 'histories',
  initialState,
  reducers: {
    setHistories: (state, action) => {
      // const res = await
      state.histories = action.payload.data;
      state.total = action.payload.total;
    }
  }
});

export default histories.reducer;

export const { setHistories } = histories.actions;
