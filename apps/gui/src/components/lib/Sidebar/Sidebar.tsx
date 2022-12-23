import { FC } from 'react';
import { Drawer } from '@gui/components';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { MainMenu, AdminMenu } from '@gui/modules';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useAuth } from '@gui/hooks';

export interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ open, toggleDrawer }) => {
  const { isAdmin } = useAuth();

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <MainMenu />
        {isAdmin && <AdminMenu />}
      </List>
    </Drawer>
  );
};

export default Sidebar;
