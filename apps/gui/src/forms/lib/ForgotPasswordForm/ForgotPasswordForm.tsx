import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { UIFormTextField, UIButton } from '@ui';
import { FC } from 'react';

export enum ForgotPasswordFormInputsEnum {
  EMAIL = 'email',
}

export interface ForgotPasswordFormInputs {
  [ForgotPasswordFormInputsEnum.EMAIL]: string;
}

interface ResetPasswordFormProps {
  onSubmit: (formData: ForgotPasswordFormInputs) => void;
}

export const ForgotPasswordForm: FC<ResetPasswordFormProps> = ({ onSubmit }) => {
  const defaultValues: ForgotPasswordFormInputs = {
    [ForgotPasswordFormInputsEnum.EMAIL]: '',
  };

  if (process.env.NODE_ENV !== 'production') {
    defaultValues[ForgotPasswordFormInputsEnum.EMAIL] = 'sergii.rudchyk@gmail.com';
  }

  const validationSchema = yup.object().shape({
    [ForgotPasswordFormInputsEnum.EMAIL]: yup.string().email().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography sx={{ mt: 1, mb: 2 }} component="p">
        Please, enter your email:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UIFormTextField
            margin="none"
            fieldKey={ForgotPasswordFormInputsEnum.EMAIL}
            control={control}
            errors={errors}
            autoFocus
            type="email"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ForgotPasswordForm;
