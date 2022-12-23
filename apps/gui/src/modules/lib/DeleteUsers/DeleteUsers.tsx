import { useEffect, FC, useMemo, useCallback, useState, VoidFunctionComponent } from 'react';
import { FETCH_USERS } from '@gui/queries';
import { DELETE_USERS } from '@gui/mutations';
import { useMutation } from '@apollo/client';
import { UIButton } from '@ui';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from '@gui/hooks';
import { Tooltip } from '@mui/material';
import { DialogAreYouSure } from '@gui/components';
import { User } from '@interfaces';

import { useToggle } from '@rch';

export interface DeleteUsersProps {
  selectedUsersIds: string[];
  users: any[];
  onDeletedUsers?: () => void;
}

export const DeleteUsers: FC<DeleteUsersProps> = ({ selectedUsersIds, users, onDeletedUsers }) => {
  const [open, toggleOpen] = useToggle(false);
  const { fireErrorSnack, fireSuccessfulSnack } = useSnackbar();
  const [deleteUsers, { error, data }] = useMutation(DELETE_USERS, {
    refetchQueries: [{ query: FETCH_USERS }],
  });
  const onDeleteUsers = async () => {
    try {
      await deleteUsers({ variables: { ids: selectedUsersIds } });
      toggleOpen();
      onDeletedUsers && onDeletedUsers();
    } catch (error) {
      console.warn('onDeleteUsers', error);
    }
  };
  const usersData = useMemo(() => {
    const innerUsersData: any = {};

    for (const { id, email } of users) {
      innerUsersData[id] = email;
    }

    return innerUsersData;
  }, [users]);

  useEffect(() => {
    if (data?.deleteUsers) {
      for (const email of data.deleteUsers) {
        fireSuccessfulSnack(`${email} is successfully deleted`);
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      fireErrorSnack(error.message);
    }
  }, [error]);

  if (!selectedUsersIds.length) {
    return null;
  }

  return (
    <>
      <Tooltip title={`Delete ${selectedUsersIds.length} users`}>
        <UIButton fab color="error" onClick={toggleOpen}>
          <DeleteIcon />
        </UIButton>
      </Tooltip>
      <DialogAreYouSure open={open} onDisagree={toggleOpen} onAgree={onDeleteUsers}>
        Users will be deleted:
        <ol>
          {selectedUsersIds.map((id) => (
            <li>{usersData[id]}</li>
          ))}
        </ol>
      </DialogAreYouSure>
    </>
  );
};

export default DeleteUsers;
