import { configureStore, PreloadedState } from '@reduxjs/toolkit';
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

// import.meta.env.DEV === 1 when running unit tests, therefore this check.
const devEnvMetaVariable = import.meta.env.DEV;
const IS_DEV_ENV = typeof devEnvMetaVariable === 'boolean' && devEnvMetaVariable;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  console.log('preloadedState', preloadedState);
  return configureStore({
    devTools: import.meta.env.DEV,
    reducer: persistedReducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      let mdw = getDefaultMiddleware({
        /*@see https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist*/
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });

      if (IS_DEV_ENV) {
        mdw = mdw.concat(logger);
      }
      return mdw;
    },
  });
};

export const store = setupStore();
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof persistedReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
