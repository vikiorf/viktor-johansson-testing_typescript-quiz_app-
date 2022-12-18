import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '@/store/modules/user.slice';
import gameSettingsReducer from '@/store/modules/gameSettings.slice';

const reducers = combineReducers({
  user: userReducer,
  gameSettings: gameSettingsReducer,
});

const persistConfig = {
  key: 'quiz-app',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
