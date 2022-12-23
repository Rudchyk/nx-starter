import { useEffect, FC, useMemo } from 'react';
import { FETCH_USERS } from '@gui/queries';
import { useMutation } from '@apollo/client';
import { UIButton } from '@ui';
import { DialogForm, FormAlert } from '@gui/components';
import { ADD_USER } from '@gui/mutations';
import { useSnackbar } from '@gui/hooks';
import { useToggle } from '@rch';
import { Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddUserForm, AddUserFormInputs, AddUserFormInputsEnum } from '@gui/forms';
import { jwsSign } from '@utils';
import { normalizeFormData } from '@gui/utils';

export const AddUser = () => {
  const { fireSuccessfulSnack } = useSnackbar();
  const [open, toggleOpen] = useToggle(false);
  const [addUser, { error, data, loading, reset }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: FETCH_USERS }],
  });
  const onAddUser = async (formData: AddUserFormInputs) => {
    try {
      const userData = normalizeFormData(formData, [AddUserFormInputsEnum.REPEATED_PASSWORD]);

      await addUser({
        variables: {
          token: await jwsSign(userData),
        },
      });
      toggleOpen();
    } catch (error) {
      console.warn('[AddUser]', 'onAddUser', error);
    }
  };
  const title = 'Add user';

  useEffect(() => {
    if (data?.addUser) {
      fireSuccessfulSnack(`${data?.addUser?.email} is successfully added`);
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
        <UIButton fab color="primary" onClick={toggleOpen}>
          <AddIcon fontSize="large" />
        </UIButton>
      </Tooltip>
      <DialogForm title={title} isLoading={loading} open={open} onDialogClose={toggleOpen} form={<AddUserForm onSubmit={onAddUser} />}>
        <FormAlert error={error} />
      </DialogForm>
    </>
  );
};

export default AddUser;
