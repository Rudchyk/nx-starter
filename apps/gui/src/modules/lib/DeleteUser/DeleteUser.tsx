import { useEffect, FC } from 'react';
import { FETCH_USERS } from '@gui/queries';
import { useMutation } from '@apollo/client';
import { UIButton } from '@ui';
import { DialogAreYouSure } from '@gui/components';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_USER } from '@gui/mutations';
import { useSnackbar } from '@gui/hooks';
import { useToggle } from '@rch';
import { Tooltip } from '@mui/material';

export interface DeleteUserProps {
  data: Record<string, any>;
}

export const DeleteUser: FC<DeleteUserProps> = ({ data: { id, email } }) => {
  const { fireErrorSnack, fireSuccessfulSnack } = useSnackbar();
  const [open, toggleOpen] = useToggle(false);
  const [deleteUser, { error, data }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: FETCH_USERS }],
  });
  const onDeleteUser = (id: string | number) => async () => {
    try {
      await deleteUser({ variables: { id } });
      toggleOpen();
    } catch (error) {
      console.warn('onDeleteUser', error);
    }
  };

  useEffect(() => {
    if (data?.deleteUser) {
      fireSuccessfulSnack(`${data?.deleteUser} is successfully deleted`);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      fireErrorSnack(error.message);
    }
  }, [error]);

  return (
    <>
      <Tooltip title={`Delete ${email} user`}>
        <UIButton icon onClick={toggleOpen}>
          <DeleteIcon />
        </UIButton>
      </Tooltip>
      <DialogAreYouSure open={open} onDisagree={toggleOpen} onAgree={onDeleteUser(id)}>
        User {email} will be deleted
      </DialogAreYouSure>
    </>
  );
};

export default DeleteUser;
