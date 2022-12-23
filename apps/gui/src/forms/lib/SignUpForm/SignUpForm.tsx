import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UIFormPasswordField, UIFormTextField, UIButton } from '@ui';
import { faker } from '@faker-js/faker';
import { FC } from 'react';

export enum SignUpFormInputsEnum {
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEATED_PASSWORD = 'repeatedPassword',
}

export interface SignUpFormInputs {
  [SignUpFormInputsEnum.EMAIL]: string;
  [SignUpFormInputsEnum.PASSWORD]: string;
  [SignUpFormInputsEnum.REPEATED_PASSWORD]: string;
}

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormInputs) => void;
  isLoading?: boolean;
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, isLoading }) => {
  const validationSchema = yup.object().shape({
    [SignUpFormInputsEnum.EMAIL]: yup.string().required().email(),
    [SignUpFormInputsEnum.PASSWORD]: yup.string().required().min(4),
    [SignUpFormInputsEnum.REPEATED_PASSWORD]: yup
      .string()
      .min(4)
      .required()
      .test(SignUpFormInputsEnum.REPEATED_PASSWORD, 'password must be the same', (value, context) => value === context.parent.password),
  });
  const defaultValues: SignUpFormInputs = {
    [SignUpFormInputsEnum.EMAIL]: '',
    [SignUpFormInputsEnum.PASSWORD]: '',
    [SignUpFormInputsEnum.REPEATED_PASSWORD]: '',
  };

  if (process.env.NODE_ENV !== 'production') {
    defaultValues[SignUpFormInputsEnum.EMAIL] = faker.internet.email();
    defaultValues[SignUpFormInputsEnum.PASSWORD] = '1111';
    defaultValues[SignUpFormInputsEnum.REPEATED_PASSWORD] = '1111';
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UIFormTextField
            fieldKey={SignUpFormInputsEnum.EMAIL}
            margin="none"
            control={control}
            errors={errors}
            fullWidth
            label="Email Address"
            autoComplete="email"
            type="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UIFormPasswordField fieldKey={SignUpFormInputsEnum.PASSWORD} margin="none" control={control} errors={errors} label="Password" required fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UIFormPasswordField
            fieldKey={SignUpFormInputsEnum.REPEATED_PASSWORD}
            margin="none"
            control={control}
            errors={errors}
            label="Repeated password"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <UIButton loading={isLoading} type="submit" fullWidth variant="contained">
            Sign In
          </UIButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
