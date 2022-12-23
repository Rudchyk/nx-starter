import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { Link as RouteLink } from 'react-router-dom';
import { useState } from 'react';
import { GuiRoutesEnum, GuiAccountRoutesEnum } from '@constants';
import { getFirstLetter } from '@utils';
import { useAuth, useRoutes } from '@gui/hooks';
import SettingsIcon from '@mui/icons-material/Settings';

export const AccountMenu = () => {
  const { authUser } = useAuth();
  const { isStrictRoute, getFullRoute } = useRoutes();
  const settingsPath = getFullRoute(GuiRoutesEnum.ACCOUNT, GuiAccountRoutesEnum.SETTINGS);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleMenuClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <Avatar>{getFirstLetter(authUser?.email)}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {!isStrictRoute(GuiRoutesEnum.ACCOUNT) && (
          <MenuItem component={RouteLink} to={GuiRoutesEnum.ACCOUNT}>
            <Avatar /> Profile
          </MenuItem>
        )}
        {!isStrictRoute(settingsPath) && (
          <MenuItem component={RouteLink} to={settingsPath}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            Settings
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default AccountMenu;