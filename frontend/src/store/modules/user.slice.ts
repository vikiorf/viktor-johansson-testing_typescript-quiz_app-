import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

const { reducer: userReducer, actions } = createSlice({
  name: 'user',
  initialState: { isCookiesConsentApproved: false, name: '' },
  reducers: {
    setCookieConsent(state, action: PayloadAction<boolean>) {
      state.isCookiesConsentApproved = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const getStoredCookieConsent = (state: RootState) =>
  state.user.isCookiesConsentApproved;
export const getStoredUserName = (state: RootState) => state.user.name;

export const { setCookieConsent } = actions;
export const { setUserName } = actions;
export default userReducer;
