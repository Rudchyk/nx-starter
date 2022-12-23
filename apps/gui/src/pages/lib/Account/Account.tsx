import { Outlet } from 'react-router-dom';
import { Default } from '@gui/layouts';
import { useAuth } from '@gui/hooks';
import { GlobalLoading } from '@gui/layouts';
import { Navigate } from 'react-router-dom';
import { GuiRoutesEnum } from '@constants';

export const Account = () => {
  return (
    <Default>
      <Outlet />
    </Default>
  );
};

export default Account;
