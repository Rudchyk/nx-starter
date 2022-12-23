import { Link as RouteLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { GuiRoutesEnum, GuiAdminRoutesEnum } from '@constants';
import { ListSubheader } from '@mui/material';

export const AdminMenu = () => {
  const list = [
    {
      text: 'Users',
      icon: <SupervisedUserCircleIcon />,
      to: `${GuiRoutesEnum.ADMIN}/${GuiAdminRoutesEnum.USERS}`,
      isDisabled: false,
    },
  ];

  return (
    <>
      <ListSubheader component="div" inset>
        Admin
      </ListSubheader>
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

export default AdminMenu;
