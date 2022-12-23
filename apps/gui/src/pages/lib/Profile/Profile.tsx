import { PageTmpl } from '@gui/templates';
import { Alert, Avatar, Box, Grid } from '@mui/material';
import { getFirstLetter } from '@utils';
import { useAuth } from '@gui/hooks';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import moment from 'moment';
import EventIcon from '@mui/icons-material/Event';
import { InfoGridCopiedElement, InfoGridElement } from '@gui/components';
import { DeleteProfile, ChangePassword } from '@gui/modules';
import { UIButton } from '@ui';
import { AUTH_USER } from '@gui/queries';
import { useSnackbar } from '@gui/hooks';
import { RESEND_CONFIRMATION_EMAIL } from '@gui/mutations';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { getGraphQLErrorData } from '@gui/utils';

export const Profile = () => {
  const { authUser, isSuper } = useAuth();
  const { fireSuccessfulSnack, fireErrorSnack } = useSnackbar();
  const [resendConfirmationEmail, { loading }] = useMutation(RESEND_CONFIRMATION_EMAIL, {
    refetchQueries: [{ query: AUTH_USER }],
  });

  if (!authUser) {
    return null;
  }

  const { id, role, createdAt, email, emailConfirmedAt } = authUser;
  const onResendConfirmationEmail = async () => {
    try {
      const { data } = await resendConfirmationEmail({
        variables: {
          id,
        },
      });
      console.log('data', data);

      fireSuccessfulSnack(data?.resendConfirmationEmail);
    } catch (error) {
      const { message } = getGraphQLErrorData(error);
      fireErrorSnack(message);
    }
  };

  return (
    <PageTmpl title="Profile" tools={!isSuper && <DeleteProfile userId={id} />}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ height: 200, dispaly: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar sx={{ width: 160, height: 160, fontSize: 90 }}>{getFirstLetter(email)}</Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <InfoGridElement xs={12} sm={6} icon={<SupervisorAccountIcon />} title="Role" value={role} />
            <InfoGridElement xs={12} sm={6} icon={<EventIcon />} title="Registration date" value={moment(createdAt).format('DD/MM/yyyy HH:mm:ss')} />
            <InfoGridCopiedElement xs={12} sm={6} fieldKey="ID" label="ID" value={id} />
            <Grid item xs={12} sm={6} sx={{ textAlign: 'right', alignSelf: 'center' }}>
              <ChangePassword userId={id} />
            </Grid>
            <InfoGridCopiedElement xs={12} sm={6} fieldKey="email" label="Email Address" value={email} />
            <Grid item xs={12} sm={6}>
              <Alert
                sx={{ width: '100%', height: '100%', alignItems: 'center' }}
                severity={emailConfirmedAt ? 'success' : 'error'}
                action={
                  emailConfirmedAt ? undefined : (
                    <UIButton loading={loading} onClick={onResendConfirmationEmail}>
                      resend
                    </UIButton>
                  )
                }>
                {emailConfirmedAt ? 'The email is verified' : 'The email is not verified'}
              </Alert>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageTmpl>
  );
};

export default Profile;
