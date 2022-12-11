import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import PageLoading from '@/components/common/PageLoading';
import SubPage from '@/pages/admin/SubPage';
import NotFound from '@/pages/NotFound';

const HomeView = lazy(() => import('@/pages/HomeView'));
const Admin = lazy(() => import('@/pages/Admin'));
const Login = lazy(() => import('@/pages/Login'));

const AppRoutes = () => {
  console.log('AppRoutes render...');
  return (
    <HashRouter>
      <Routes>
        <Route
          path={`/`}
          element={
            <Suspense fallback={<PageLoading />}>
              <HomeView />
            </Suspense>
          }
        />
        <Route path={`/login`} element={<Login />} />
        <Route
          path={`/admin`}
          element={
            <Suspense fallback={<PageLoading />}>
              <Admin />
            </Suspense>
          }
        >
          <Route path={'sub'} element={<SubPage />} />
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
