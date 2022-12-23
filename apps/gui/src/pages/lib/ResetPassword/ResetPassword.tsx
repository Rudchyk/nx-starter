import { Simple, GlobalLoading } from '@gui/layouts';
import { Box } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { VERIFY_RESET_PASSWORD } from '@gui/queries';
import Alert from '@mui/material/Alert';
import { ResetPassword as ResetPasswordModule } from '@gui/modules';
import { PasswordResetItem } from '@interfaces';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GuiRoutesEnum } from '@constants';

interface ConfirmEmailAPIResponse {
  verifyResetPassword: PasswordResetItem;
}

export const ResetPassword = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery<ConfirmEmailAPIResponse>(VERIFY_RESET_PASSWORD, { variables: { code } });

  if (loading) {
    return <GlobalLoading />;
  }

  if (data && data.verifyResetPassword === null) {
    return <Navigate to={GuiRoutesEnum.AUTH} replace />;
  }

  return (
    <Simple maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        {error && (
          <Alert severity="error" sx={{ fontSize: '50px', '.MuiAlert-icon': { fontSize: '50px', alignItems: 'center' } }}>
            {error.message}
          </Alert>
        )}
        {data && <ResetPasswordModule data={data.verifyResetPassword} />}
      </Box>
    </Simple>
  );
};

export default ResetPassword;
