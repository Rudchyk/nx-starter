import { DialogForm, FormAlert } from '@gui/components';
import { ForgotPasswordForm, ForgotPasswordFormInputs } from '@gui/forms';
import { SubmitHandler } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { useSnackbar } from '@gui/hooks';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '@gui/mutations';

interface ForgotPasswordProps {
  open: boolean;
  toggleOpen: any;
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ open, toggleOpen }) => {
  const { fireSuccessfulSnack } = useSnackbar();
  const [forgotPassword, { error, data, loading, reset }] = useMutation(FORGOT_PASSWORD);
  const ForgotPasswordFormSubmit: SubmitHandler<ForgotPasswordFormInputs> = async ({ email }) => {
    try {
      await forgotPassword({ variables: { email } });
    } catch (error) {
      console.log('[ForgotPassword onFormSubmit]', error);
    }
  };

  useEffect(() => {
    if (data?.forgotPassword) {
      fireSuccessfulSnack(data.forgotPassword);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <DialogForm
      title="Forgot Password"
      isLoading={loading}
      open={open}
      onDialogClose={toggleOpen}
      form={<ForgotPasswordForm onSubmit={ForgotPasswordFormSubmit} />}>
      <FormAlert error={error} />
    </DialogForm>
  );
};
