import { Title, HeaderButtonsStack } from '@gui/components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { UIButton } from '@ui';
import { GuiRoutesEnum } from '@constants';
import HomeIcon from '@mui/icons-material/Home';
import { useRoutes, useAuth } from '@gui/hooks';
import { Tooltip } from '@mui/material';

export const SimpleHeader = () => {
  const { isRoute } = useRoutes();

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          pr: '24px',
        }}>
        {!isRoute(GuiRoutesEnum.HOME) && (
          <Tooltip title="Home">
            <UIButton sx={{ mr: 2 }} color="inherit" icon to={GuiRoutesEnum.HOME}>
              <HomeIcon />
            </UIButton>
          </Tooltip>
        )}
        <Title />
        <HeaderButtonsStack />
      </Toolbar>
    </AppBar>
  );
};

export default SimpleHeader;
