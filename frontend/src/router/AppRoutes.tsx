import { HashRouter, Route, Routes } from 'react-router-dom';

import HomeView from '@/pages/HomeView';
import DifficultySettingView from '@/pages/DifficultySettingView';
import LanguageSettingView from '@/pages/LanguageSettingView';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<HomeView />} />
        <Route path={`/difficulty-setup`} element={<DifficultySettingView />} />
        <Route path={`/language-setup`} element={<LanguageSettingView />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
