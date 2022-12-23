import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { UIFormPasswordField } from '@ui';
import { FC } from 'react';

export enum ChangePasswordFormInputsEnum {
  OPD_PASSWORD = 'oldPassword',
  NEW_PASSWORD = 'password',
  REPEATED_NEW_PASSWORD = 'repeatedNewPassword',
}

export interface ChangePasswordFormInputs {
  [ChangePasswordFormInputsEnum.OPD_PASSWORD]: string;
  [ChangePasswordFormInputsEnum.NEW_PASSWORD]: string;
  [ChangePasswordFormInputsEnum.REPEATED_NEW_PASSWORD]: string;
}

interface ResetPasswordFormProps {
  onSubmit: (formData: ChangePasswordFormInputs) => void;
}

export const ChangePasswordForm: FC<ResetPasswordFormProps> = ({ onSubmit }) => {
  const defaultValues: ChangePasswordFormInputs = {
    [ChangePasswordFormInputsEnum.NEW_PASSWORD]: '',
    [ChangePasswordFormInputsEnum.OPD_PASSWORD]: '',
    [ChangePasswordFormInputsEnum.REPEATED_NEW_PASSWORD]: '',
  };
  const validationSchema = yup.object().shape({
    [ChangePasswordFormInputsEnum.OPD_PASSWORD]: yup.string().min(4).required(),
    [ChangePasswordFormInputsEnum.NEW_PASSWORD]: yup
      .string()
      .min(4)
      .required()
      .test(
        ChangePasswordFormInputsEnum.NEW_PASSWORD,
        'passwords are equal with old one, please, provide the new!',
        (value, context) => value !== context.parent[ChangePasswordFormInputsEnum.OPD_PASSWORD]
      ),
    [ChangePasswordFormInputsEnum.REPEATED_NEW_PASSWORD]: yup
      .string()
      .min(4)
      .required()
      .test(
        ChangePasswordFormInputsEnum.REPEATED_NEW_PASSWORD,
        'password must be the same',
        (value, context) => value === context.parent[ChangePasswordFormInputsEnum.NEW_PASSWORD]
      ),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UIFormPasswordField
            margin="none"
            fieldKey={ChangePasswordFormInputsEnum.OPD_PASSWORD}
            control={control}
            errors={errors}
            required
            fullWidth
            label="Old Password"
          />
        </Grid>
        <Grid item xs={12}>
          <UIFormPasswordField
            margin="none"
            fieldKey={ChangePasswordFormInputsEnum.NEW_PASSWORD}
            control={control}
            errors={errors}
            required
            fullWidth
            label="New Password"
          />
        </Grid>
        <Grid item xs={12}>
          <UIFormPasswordField
            margin="none"
            fieldKey={ChangePasswordFormInputsEnum.REPEATED_NEW_PASSWORD}
            control={control}
            errors={errors}
            required
            fullWidth
            label="Repeated new password"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;
