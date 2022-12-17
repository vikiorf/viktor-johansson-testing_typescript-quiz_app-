import { HashRouter, Route, Routes } from 'react-router-dom';

import HomeView from '@/pages/HomeView';
import DifficultySettingView from '@/pages/DifficultySettingView';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<HomeView />} />
        <Route path={`/difficulty-setup`} element={<DifficultySettingView />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
