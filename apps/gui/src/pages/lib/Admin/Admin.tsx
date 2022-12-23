import { Outlet } from 'react-router-dom';
import { Default } from '@gui/layouts';

export const Admin = () => {
  return (
    <Default>
      <Outlet />
    </Default>
  );
};

export default Admin;
