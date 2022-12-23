import { useEffect, useState } from 'react';
import { Default, GlobalLoading } from '@gui/layouts';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CONFIRM_EMAIL } from '@gui/queries';
import Alert, { AlertColor } from '@mui/material/Alert';

interface ConfirmEmailAPIResponse {
  confirmedEmail: string | null;
}

interface ConfirmEmailAlert {
  severity: AlertColor;
  message: string;
}

export const ConfirmEmail = () => {
  const { code } = useParams();
  const [alert, setAlert] = useState<null | ConfirmEmailAlert>(null);
  const { loading, error, data } = useQuery<ConfirmEmailAPIResponse>(CONFIRM_EMAIL, { variables: { code } });

  useEffect(() => {
    if (error) {
      setAlert({
        severity: 'error',
        message: error?.message,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      switch (data.confirmedEmail) {
        case null:
          setAlert({
            severity: 'warning',
            message: 'There are not data from server!',
          });
          break;
        default:
          setAlert({
            severity: 'success',
            message: `Email: ${data.confirmedEmail} is confirmed!`,
          });
          break;
      }
    }
  }, [data]);

  if (loading) {
    return <GlobalLoading />;
  }

  return (
    <Default>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        {alert && (
          <Alert severity={alert.severity} sx={{ fontSize: '50px', '.MuiAlert-icon': { fontSize: '50px', alignItems: 'center' } }}>
            {alert.message}
          </Alert>
        )}
      </Box>
    </Default>
  );
};

export default ConfirmEmail;
