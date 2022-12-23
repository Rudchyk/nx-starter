import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UITabs } from '@ui';
import { Simple } from '@gui/layouts';
import { Box } from '@mui/material';
import { LogIn, SignUp } from '@gui/modules';
import { useState } from 'react';
import { GuiRoutesEnum } from '@constants';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@gui/hooks';
import { GlobalLoading } from '@gui/layouts';
import styles from './Auth.module.sass';

enum SignInTabsEnum {
  LOGIN = 'logIn',
  SINGUP = 'singUp',
}

export const Auth = () => {
  const { isAuthorized, isAuthorization } = useAuth();
  const [activeSignInTab, setActiveSignInTab] = useState('');
  const tabs = [
    {
      key: SignInTabsEnum.LOGIN,
      label: 'Log In',
      Component: LogIn,
    },
    {
      key: SignInTabsEnum.SINGUP,
      label: 'Sing Up',
      Component: SignUp,
    },
  ];
  const onTabsChange = (newValue: string) => setActiveSignInTab(newValue);

  if (isAuthorization) {
    return <GlobalLoading />;
  }

  if (isAuthorized) {
    return <Navigate to={GuiRoutesEnum.HOME} replace />;
  }

  return (
    <Simple maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', pt: 10, minWidth: 400 }}>
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <UITabs stretchTab activeTab={activeSignInTab} onTabsChange={onTabsChange} className={styles.tabs} ariaLabel="Sing In tabs" tabs={tabs} />
      </Box>
    </Simple>
  );
};

export default Auth;
