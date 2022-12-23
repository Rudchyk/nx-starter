import { useEffect, FC } from 'react';
import { AUTH_USER } from '@gui/queries';
import { useMutation } from '@apollo/client';
import { UIButton } from '@ui';
import { DialogAreYouSure } from '@gui/components';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_USER } from '@gui/mutations';
import { useSnackbar } from '@gui/hooks';
import { useToggle } from '@rch';
import { Tooltip } from '@mui/material';

export interface DeleteProfileProps {
  userId: string;
}

export const DeleteProfile: FC<DeleteProfileProps> = ({ userId }) => {
  const { fireErrorSnack, fireSuccessfulSnack } = useSnackbar();
  const [open, toggleOpen] = useToggle(false);
  const [deleteUser, { error, data }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: AUTH_USER }],
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
      <Tooltip title={`Delete profile`}>
        <UIButton fab color="error" onClick={toggleOpen}>
          <DeleteIcon />
        </UIButton>
      </Tooltip>
      <DialogAreYouSure open={open} onDisagree={toggleOpen} onAgree={onDeleteUser(userId)}>
        Profile will be deleted
      </DialogAreYouSure>
    </>
  );
};

export default DeleteProfile;
