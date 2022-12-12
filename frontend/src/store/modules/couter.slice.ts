import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { reducer: counterReducers, actions } = createSlice({
  name: 'counter',
  initialState: { count: 1 },
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
  },
});
export const { increment } = actions;
export default counterReducers;
