import { HashRouter, Route, Routes } from 'react-router-dom';

import HomeView from '@/pages/HomeView';
import GameView from '@/pages/GameView';
import ReadyView from '@/pages/ReadyView';
import ResultView from '@/pages/ResultView';
import LanguageSettingView from '@/pages/LanguageSettingView';
import DifficultySettingView from '@/pages/DifficultySettingView';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<HomeView />} />
        <Route path={`/game`} element={<GameView />} />
        <Route path={`/ready`} element={<ReadyView />} />
        <Route path={`/result`} element={<ResultView />} />
        <Route path={`/language-setup`} element={<LanguageSettingView />} />
        <Route path={`/difficulty-setup`} element={<DifficultySettingView />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
