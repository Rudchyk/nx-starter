import { ResetPasswordForm, ResetPasswordFormInputs, ResetPasswordFormInputsEnum } from '@gui/forms';
import { Grid } from '@mui/material';
import { HomeButton, FormAlert } from '@gui/components';
import { useSnackbar } from '@gui/hooks';
import { RESET_PASSWORD } from '@gui/mutations';
import { GuiRoutesEnum } from '@constants';
import { normalizeFormData } from '@gui/utils';
import { PasswordResetItem } from '@interfaces';
import { FC, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { jwsSign } from '@utils';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordProps {
  data: PasswordResetItem;
}

export const ResetPassword: FC<ResetPasswordProps> = ({ data: PasswordResetData }) => {
  const { fireSuccessfulSnack } = useSnackbar();
  const navigate = useNavigate();
  const [resetPassword, { error, data, loading }] = useMutation(RESET_PASSWORD);
  const onResetPassword = async (formData: ResetPasswordFormInputs) => {
    console.log('PasswordResetData', PasswordResetData);

    try {
      const resetPasswordData = normalizeFormData(formData, [ResetPasswordFormInputsEnum.REPEATED_PASSWORD], (result) => {
        result.id = PasswordResetData.id;
        result.email = PasswordResetData.email;
      });

      console.log('resetPasswordData', resetPasswordData);

      await resetPassword({
        variables: {
          token: await jwsSign(resetPasswordData),
        },
      });
    } catch (error) {
      console.warn('[ResetPassword]', 'onResetPassword', error);
    }
  };

  useEffect(() => {
    if (data?.resetPassword) {
      fireSuccessfulSnack(data?.resetPassword);
      navigate(GuiRoutesEnum.AUTH, { replace: true });
    }
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormAlert error={error} />
        <ResetPasswordForm onSubmit={onResetPassword} isLoading={loading} />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <HomeButton />
      </Grid>
    </Grid>
  );
};
