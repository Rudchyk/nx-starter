import { LogInForm } from '@gui/forms';
import { LOGIN } from '@gui/mutations';
import { Grid, Stack } from '@mui/material';
import { HomeButton } from '@gui/components';
import { UIButton } from '@ui';
import { useAuthMutation } from '@gui/hooks';
import { useToggle } from '@rch';
import { FormAlert } from '@gui/components';
import { ForgotPassword } from '@gui/modules';

export const LogIn = () => {
  const [onLogInFormSubmit, { error, loading }] = useAuthMutation(LOGIN);
  const [forgotPasswordDialogOpen, forgotPasswordDialogToggleOpen] = useToggle(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormAlert error={error} />
        <LogInForm
          onSubmit={onLogInFormSubmit}
          isLoading={loading}
          actions={
            <Stack direction="row" justifyContent="end">
              <UIButton size="small" onClick={forgotPasswordDialogToggleOpen}>
                Forgot password?
              </UIButton>
            </Stack>
          }
        />
        <ForgotPassword open={forgotPasswordDialogOpen} toggleOpen={forgotPasswordDialogToggleOpen} />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Stack direction="row" justifyContent="end">
          <HomeButton />
        </Stack>
      </Grid>
    </Grid>
  );
};
