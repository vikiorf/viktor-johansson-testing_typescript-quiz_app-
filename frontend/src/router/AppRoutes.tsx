import { HashRouter, Route, Routes } from 'react-router-dom';

import HomeView from '@/pages/HomeView';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<HomeView />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
