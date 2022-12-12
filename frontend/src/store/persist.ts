import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterReducers from '@/store/modules/couter.slice';
import userReducer from '@/store/modules/user.slice';
const reducers = combineReducers({
  counter: counterReducers,
  user: userReducer,
});

const persistConfig = {
  key: 'react-starter-template',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
