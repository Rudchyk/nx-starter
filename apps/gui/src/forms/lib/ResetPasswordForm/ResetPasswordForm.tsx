import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { UIFormPasswordField } from '@ui';
import { Grid } from '@mui/material';
import { UIButton } from '@ui';
import { FC } from 'react';

export enum ResetPasswordFormInputsEnum {
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEATED_PASSWORD = 'repeatedPassword',
}

export interface ResetPasswordFormInputs {
  [ResetPasswordFormInputsEnum.EMAIL]: string;
  [ResetPasswordFormInputsEnum.PASSWORD]: string;
  [ResetPasswordFormInputsEnum.REPEATED_PASSWORD]: string;
}

interface ResetPasswordFormProps {
  onSubmit: (formData: ResetPasswordFormInputs) => void;
  isLoading?: boolean;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const validationSchema = yup.object().shape({
    [ResetPasswordFormInputsEnum.PASSWORD]: yup.string().min(4).required(),
    [ResetPasswordFormInputsEnum.REPEATED_PASSWORD]: yup
      .string()
      .min(4)
      .required()
      .test(ResetPasswordFormInputsEnum.REPEATED_PASSWORD, 'password must be the same', (value, context) => value === context.parent.password),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(validationSchema),
  });
  const onFormError: SubmitErrorHandler<ResetPasswordFormInputs> = (errors) => {
    console.error('[ResetPasswordForm]', 'onFormError', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onFormError)} noValidate>
      <Typography sx={{ mt: 1, mb: 2 }} component="p">
        Please, enter your new password and repeat it
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UIFormPasswordField
            margin="none"
            fieldKey={ResetPasswordFormInputsEnum.PASSWORD}
            control={control}
            errors={errors}
            label="Password"
            fullWidth
            required
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <UIFormPasswordField
            margin="none"
            fieldKey={ResetPasswordFormInputsEnum.REPEATED_PASSWORD}
            control={control}
            errors={errors}
            label="Repeats password"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <UIButton loading={isLoading} type="submit" fullWidth variant="contained">
            Reset
          </UIButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPasswordForm;
