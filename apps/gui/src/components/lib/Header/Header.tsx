import { FC } from 'react';
import { AppBar, Title, HeaderButtonsStack } from '@gui/components';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export interface HeaderProps {
  open: boolean;
  toggleDrawer: () => void;
}

export const Header: FC<HeaderProps> = ({ open, toggleDrawer }) => {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px',
        }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}>
          <MenuIcon />
        </IconButton>
        <Title />
        <HeaderButtonsStack />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
