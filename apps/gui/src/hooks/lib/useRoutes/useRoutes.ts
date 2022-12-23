import { useLocation } from 'react-router-dom';

export const useRoutes = () => {
  const { pathname } = useLocation();

  const getFullRoute = (...parts: string[]) => {
    return parts.join('/');
  };
  const isRoute = (...parts: string[]) => {
    return pathname === getFullRoute(...parts);
  };
  const isStrictRoute = (path: string) => {
    return pathname === path;
  };

  return { isRoute, getFullRoute, isStrictRoute };
};

export default useRoutes;
