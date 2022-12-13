import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

const { reducer: userReducer, actions } = createSlice({
  name: 'user',
  initialState: { isCookiesConsentApproved: false },
  reducers: {
    setCookieConsent(state, action: PayloadAction<boolean>) {
      state.isCookiesConsentApproved = action.payload;
    },
  },
});

export const getStoredCookieConsent = (state: RootState) =>
  state.user.isCookiesConsentApproved;
export const { setCookieConsent } = actions;
export default userReducer;
