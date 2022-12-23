import { FC } from 'react';
import { useAuth } from '@gui/hooks';
import { GuiRoutesEnum } from '@constants';
import { Navigate } from 'react-router-dom';
import { GlobalLoading } from '@gui/layouts';

interface ProtectedProps {
  children: JSX.Element;
  isAdminProtected?: boolean;
}

export const Protected: FC<ProtectedProps> = ({ children, isAdminProtected = false }) => {
  const { isAuthorized, isAuthorization, isAdmin } = useAuth();

  if (isAuthorization) {
    return <GlobalLoading />;
  }

  if (!isAuthorized || (isAuthorized && isAdminProtected && !isAdmin)) {
    return <Navigate to={GuiRoutesEnum.AUTH} replace />;
  }

  return children;
};

export default Protected;
