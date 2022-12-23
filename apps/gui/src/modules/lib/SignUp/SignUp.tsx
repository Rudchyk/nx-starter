import { SignUpForm, SignUpFormInputsEnum, SignUpFormInputs } from '@gui/forms';
import { Grid } from '@mui/material';
import { HomeButton } from '@gui/components';
import { useAuthMutation } from '@gui/hooks';
import { SIGNUP } from '@gui/mutations';
import { FormAlert } from '@gui/components';
import { normalizeFormData } from '@gui/utils';

export const SignUp = () => {
  const [onSignUpFormSubmit, { error, loading }] = useAuthMutation(SIGNUP);

  const onSignUp = async (formData: SignUpFormInputs) => {
    try {
      const signUpData = normalizeFormData(formData, [SignUpFormInputsEnum.REPEATED_PASSWORD]);

      await onSignUpFormSubmit(signUpData);
    } catch (error) {
      console.warn('[onSignUp]', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormAlert error={error} />
        <SignUpForm onSubmit={onSignUp} isLoading={loading} />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <HomeButton />
      </Grid>
    </Grid>
  );
};
