import { Link as RouteLink, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { GuiRoutesEnum } from '@constants';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useRoutes, useAuth } from '@gui/hooks';

export const MainMenu = () => {
  const { isRoute } = useRoutes();
  const { isAuthorized } = useAuth();
  const list = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      to: GuiRoutesEnum.HOME,
      isDisabled: isRoute(GuiRoutesEnum.HOME),
    },
  ];

  return (
    <>
      {list.map(
        ({ text, to, icon, isDisabled }) =>
          !isDisabled && (
            <ListItem key={text} button component={RouteLink} to={to}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          )
      )}
    </>
  );
};

export default MainMenu;
