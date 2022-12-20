import { HashRouter, Route, Routes } from 'react-router-dom';

import HomeView from '@/pages/HomeView';
import ReadyView from '@/pages/ReadyView';
import LanguageSettingView from '@/pages/LanguageSettingView';
import DifficultySettingView from '@/pages/DifficultySettingView';
import GameView from '@/pages/GameView';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<HomeView />} />
        <Route path={`/difficulty-setup`} element={<DifficultySettingView />} />
        <Route path={`/language-setup`} element={<LanguageSettingView />} />
        <Route path={`/ready`} element={<ReadyView />} />
        <Route path={`/game`} element={<GameView />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
