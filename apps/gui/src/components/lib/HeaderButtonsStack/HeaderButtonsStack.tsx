import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { UIButton } from '@ui';
import LoginIcon from '@mui/icons-material/Login';
import { Tooltip } from '@mui/material';
import { GuiRoutesEnum } from '@constants';
import { useAuth, useSnackbar, useRoutes } from '@gui/hooks';
import { AccountMenu } from '@gui/modules';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '@gui/mutations';
import { AUTH_USER } from '@gui/queries';
import Logout from '@mui/icons-material/Logout';
import { LocalizationSwitcher, ThemeModeSwitcher } from '@gui/components';

export const HeaderButtonsStack = () => {
  const { isRoute } = useRoutes();
  const { isAuthorized } = useAuth();
  const { fireSuccessfulSnack, fireErrorSnack } = useSnackbar();
  const [logout, { data }] = useMutation(LOGOUT, {
    refetchQueries: [{ query: AUTH_USER }],
  });
  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      fireErrorSnack((error as any).message);
      console.warn('[Header onLogout]', error);
    }
  };

  useEffect(() => {
    if (data && data.logout) {
      fireSuccessfulSnack(data.logout);
    }
  }, [data]);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <LocalizationSwitcher sx={{ mr: 1 }} />
      <ThemeModeSwitcher />
      {!isRoute(GuiRoutesEnum.AUTH) && (
        <>
          {isAuthorized ? (
            <>
              <AccountMenu />
              <Tooltip title="Log out">
                <UIButton icon color="inherit" onClick={onLogout}>
                  <Logout />
                </UIButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Log in">
              <UIButton icon color="inherit" to={GuiRoutesEnum.AUTH}>
                <LoginIcon />
              </UIButton>
            </Tooltip>
          )}
        </>
      )}
    </Stack>
  );
};

export default HeaderButtonsStack;
