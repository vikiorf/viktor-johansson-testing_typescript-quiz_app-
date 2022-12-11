import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import persistedReducer from '@/store/persist';

export const store = configureStore({
  devTools: import.meta.env.DEV,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    let mdw = getDefaultMiddleware({
      /*@see https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist*/
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    if (import.meta.env.DEV) {
      mdw = mdw.concat(logger);
    }
    return mdw;
  },
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
