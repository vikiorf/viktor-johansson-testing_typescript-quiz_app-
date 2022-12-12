import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { reducer: userReducer, actions } = createSlice({
  name: 'user',
  initialState: { token: '' },
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = actions;
export default userReducer;
