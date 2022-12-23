import { Grid } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UIFormPasswordField, UIFormTextField, UIFormSelect } from '@ui';
import { UserRolesEnum } from '@constants';
import { UserRoles } from '@interfaces';
import { faker } from '@faker-js/faker';
import { FC } from 'react';

export enum AddUserFormInputsEnum {
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEATED_PASSWORD = 'repeatedPassword',
  ROLE = 'role',
}

export interface AddUserFormInputs {
  [AddUserFormInputsEnum.EMAIL]: string;
  [AddUserFormInputsEnum.PASSWORD]: string;
  [AddUserFormInputsEnum.ROLE]: UserRoles;
  [AddUserFormInputsEnum.REPEATED_PASSWORD]: string;
}

interface AddUserFormProps {
  onSubmit: (formData: AddUserFormInputs) => void;
}

export const AddUserForm: FC<AddUserFormProps> = ({ onSubmit }) => {
  const defaultValues: AddUserFormInputs = {
    [AddUserFormInputsEnum.EMAIL]: '',
    [AddUserFormInputsEnum.PASSWORD]: '',
    [AddUserFormInputsEnum.REPEATED_PASSWORD]: '',
    [AddUserFormInputsEnum.ROLE]: UserRolesEnum.user,
  };

  if (process.env.NODE_ENV !== 'production') {
    defaultValues[AddUserFormInputsEnum.EMAIL] = faker.internet.email();
    defaultValues[AddUserFormInputsEnum.PASSWORD] = '1111';
    defaultValues[AddUserFormInputsEnum.REPEATED_PASSWORD] = '1111';
  }

  const validationSchema = yup.object().shape({
    [AddUserFormInputsEnum.EMAIL]: yup.string().required().email(),
    [AddUserFormInputsEnum.PASSWORD]: yup.string().required().min(4),
    [AddUserFormInputsEnum.REPEATED_PASSWORD]: yup
      .string()
      .min(4)
      .required()
      .test(
        AddUserFormInputsEnum.REPEATED_PASSWORD,
        'password must be the same',
        (value: string | undefined, context: any) => Boolean(value) && value === context.parent.password
      ),
    [AddUserFormInputsEnum.ROLE]: yup.string(),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddUserFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const list = Object.values(UserRolesEnum)
    .filter((item) => item !== UserRolesEnum.super)
    .map((item) => ({
      value: item,
      label: item.toUpperCase(),
    }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UIFormTextField
            fieldKey={AddUserFormInputsEnum.EMAIL}
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
          <UIFormPasswordField
            fieldKey={AddUserFormInputsEnum.PASSWORD}
            margin="none"
            control={control}
            errors={errors}
            label="Password"
            required
            fullWidth
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UIFormPasswordField
            fieldKey={AddUserFormInputsEnum.REPEATED_PASSWORD}
            margin="none"
            control={control}
            errors={errors}
            label="Repeated password"
            autoComplete="repeated-password"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <UIFormSelect control={control} fieldKey={AddUserFormInputsEnum.ROLE} margin="none" errors={errors} label="Role" required fullWidth list={list} />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddUserForm;
