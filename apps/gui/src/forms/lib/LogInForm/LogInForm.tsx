import { FC, ReactNode } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UIFormTextField, UIFormPasswordField, UIButton } from '@ui';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';

export enum LogInFormInputsEnum {
  EMAIL = 'email',
  PASSWORD = 'password',
  REMEMBER = 'remember',
}

export interface LogInFormInputs {
  [LogInFormInputsEnum.EMAIL]: string;
  [LogInFormInputsEnum.PASSWORD]: string;
}

interface LogInFormProps {
  onSubmit: (formData: LogInFormInputs) => void;
  isLoading?: boolean;
  actions: ReactNode;
}

export const LogInForm: FC<LogInFormProps> = ({ onSubmit, isLoading, actions }) => {
  const defaultValues: LogInFormInputs = {
    [LogInFormInputsEnum.EMAIL]: '',
    [LogInFormInputsEnum.PASSWORD]: '',
  };

  if (process.env.NODE_ENV !== 'production') {
    defaultValues[LogInFormInputsEnum.EMAIL] = 'sergii.rudchyk@gmail.com';
    defaultValues[LogInFormInputsEnum.PASSWORD] = '1111';
  }

  const validationSchema = yup.object().shape({
    [LogInFormInputsEnum.EMAIL]: yup.string().email().required(),
    [LogInFormInputsEnum.PASSWORD]: yup.string().min(4).required(),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LogInFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UIFormTextField
            margin="none"
            fieldKey={LogInFormInputsEnum.EMAIL}
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
        <Grid item xs={12}>
          <UIFormPasswordField
            margin="none"
            fieldKey={LogInFormInputsEnum.PASSWORD}
            control={control}
            errors={errors}
            label="Password"
            fullWidth
            required
            autoComplete="current-password"
          />
        </Grid>
        {actions && (
          <Grid item xs={12}>
            {actions}
          </Grid>
        )}
        <Grid item xs={12}>
          <UIButton loading={isLoading} type="submit" fullWidth variant="contained">
            Log In
          </UIButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default LogInForm;
