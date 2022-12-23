import { useEffect, FC, useMemo } from 'react';
import { AUTH_USER } from '@gui/queries';
import { useMutation } from '@apollo/client';
import { UIButton } from '@ui';
import { DialogForm, FormAlert } from '@gui/components';
import { CHANGE_PASSWORD } from '@gui/mutations';
import { useSnackbar } from '@gui/hooks';
import { useToggle } from '@rch';
import { Tooltip } from '@mui/material';
import { ChangePasswordForm, ChangePasswordFormInputs, ChangePasswordFormInputsEnum } from '@gui/forms';
import { jwsSign } from '@utils';
import { normalizeFormData } from '@gui/utils';

interface ChangePasswordProps {
  userId: string;
}

export const ChangePassword = ({ userId }: ChangePasswordProps) => {
  const { fireSuccessfulSnack } = useSnackbar();
  const [open, toggleOpen] = useToggle(false);
  const [changePassword, { error, data, loading, reset }] = useMutation(CHANGE_PASSWORD, {
    refetchQueries: [{ query: AUTH_USER }],
  });
  const onChangePassword = async (formData: ChangePasswordFormInputs) => {
    try {
      const changePasswordData = normalizeFormData(formData, [ChangePasswordFormInputsEnum.REPEATED_NEW_PASSWORD], (data) => {
        data.id = userId;
      });

      await changePassword({
        variables: {
          token: await jwsSign(changePasswordData),
        },
      });
      toggleOpen();
    } catch (error) {
      console.log('[ChangeUserPassword]', 'onFormSubmit', error);
    }
  };
  const title = 'Change password';

  useEffect(() => {
    if (data?.changePassword) {
      fireSuccessfulSnack(data?.changePassword);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <>
      <Tooltip title={title}>
        <UIButton variant="outlined" aria-label="Change Password" color="primary" onClick={toggleOpen}>
          Change Password
        </UIButton>
      </Tooltip>
      <DialogForm title={title} isLoading={loading} open={open} onDialogClose={toggleOpen} form={<ChangePasswordForm onSubmit={onChangePassword} />}>
        <FormAlert error={error} />
      </DialogForm>
    </>
  );
};

export default ChangePassword;
