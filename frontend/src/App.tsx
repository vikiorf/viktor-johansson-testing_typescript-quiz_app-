import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppRoutes from '@/router/AppRoutes';
import { persistor, store } from '@/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
