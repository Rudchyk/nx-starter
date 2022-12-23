import { Suspense, lazy } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { GuiRoutesEnum, GuiAdminRoutesEnum, GuiAccountRoutesEnum } from '@constants';
import { GlobalLoading, Default } from '@gui/layouts';
import { Protected } from '@gui/components';

const Home = lazy(() => import('../pages/lib/Home/Home'));
const Auth = lazy(() => import('../pages/lib/Auth/Auth'));
const NoMatch = lazy(() => import('../pages/lib/NoMatch/NoMatch'));
const Admin = lazy(() => import('../pages/lib/Admin/Admin'));
const Users = lazy(() => import('../pages/lib/Users/Users'));
const User = lazy(() => import('../pages/lib/User/User'));
const Settings = lazy(() => import('../pages/lib/Settings/Settings'));
const Profile = lazy(() => import('../pages/lib/Profile/Profile'));
const Account = lazy(() => import('../pages/lib/Account/Account'));
const ResetPassword = lazy(() => import('../pages/lib/ResetPassword/ResetPassword'));
const ConfirmEmail = lazy(() => import('../pages/lib/ConfirmEmail/ConfirmEmail'));
const CookiesPolicy = lazy(() => import('../pages/lib/CookiesPolicy/CookiesPolicy'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <Routes>
        <Route path={GuiRoutesEnum.HOME} element={<Home />} />
        <Route path={GuiRoutesEnum.AUTH} element={<Auth />} />
        <Route path={GuiRoutesEnum.CONFIRM_EMAIL} element={<ConfirmEmail />} />
        <Route path={GuiRoutesEnum.RESET_PASSWORD} element={<ResetPassword />} />
        <Route
          path={GuiRoutesEnum.ACCOUNT}
          element={
            <Protected>
              <Account />
            </Protected>
          }>
          <Route index element={<Profile />} />
          <Route path={GuiAccountRoutesEnum.SETTINGS} element={<Settings />} />
        </Route>
        <Route
          path={GuiRoutesEnum.ADMIN}
          element={
            <Protected isAdminProtected={true}>
              <Admin />
            </Protected>
          }>
          <Route index element={<Navigate to={GuiAdminRoutesEnum.USERS} />} />
          <Route path={GuiAdminRoutesEnum.USERS} element={<Outlet />}>
            <Route index element={<Users />} />
            <Route path={GuiAdminRoutesEnum.USER} element={<User />} />
          </Route>
        </Route>
        <Route path={GuiRoutesEnum.COOKIES_POLICY} element={<CookiesPolicy />} />
        <Route path={GuiRoutesEnum.ERROR_404} element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
