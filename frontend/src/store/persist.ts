import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '@/store/modules/user.slice';

const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'quiz-app',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
