import { useQuery } from '@apollo/client';
import { FETCH_USERS } from '@gui/queries';
import { User } from '@interfaces';
import { GlobalLoading } from '@gui/layouts';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { GridValueGetterParams, GridValueFormatterParams, GridRowId, DataGrid, GridCellParams, GridSelectionModel, GridRowParams } from '@mui/x-data-grid';
import moment from 'moment';
import { useState } from 'react';
import { ErrorTmpl, PageTmpl } from '@gui/templates';
import { getGraphQLErrorData } from '@gui/utils';
import Paper from '@mui/material/Paper';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { UIButton } from '@ui';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { GuiRoutesEnum, GuiAdminRoutesEnum, UserRolesEnum } from '@constants';
import { Alert, Stack } from '@mui/material';
import { DeleteUser, DeleteUsers, AddUser } from '@gui/modules';
import { useAuth } from '@gui/hooks';

interface FetchUsersAPIResponse {
  users: User[];
}

const UsersList = () => {
  const { loading, error, data } = useQuery<FetchUsersAPIResponse>(FETCH_USERS);
  const [selectedUsers, setSelectedUsers] = useState<GridRowId[]>([]);
  const { authUser } = useAuth();

  if (loading) {
    return <GlobalLoading />;
  }

  if (error) {
    const { message, status } = getGraphQLErrorData(error);

    return <ErrorTmpl sx={{ px: 3 }} title={`Submission error! ${message}`} text={status} />;
  }

  if (!data) {
    return null;
  }

  const idUserLegit = (id: string | GridRowId, role: string) => authUser && (authUser.id === id || role === UserRolesEnum.super);

  const columns: any[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      hideSortIcons: true,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: () => <Grid3x3Icon />,
    },
    {
      field: 'link',
      headerName: 'Link',
      width: 50,
      hideSortIcons: true,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ id }: GridValueGetterParams) => (
        <UIButton icon to={`${GuiRoutesEnum.ADMIN}/${GuiAdminRoutesEnum.USERS}/${id}`}>
          <InsertLinkIcon />
        </UIButton>
      ),
    },
    { field: 'email', headerName: 'Email', width: 260 },
    {
      field: 'role',
      headerName: 'Role',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        const role = params.row.role || '';
        switch (role) {
          case UserRolesEnum.admin:
            return <strong>{role}</strong>;
          case UserRolesEnum.super:
            return <strong>{role.toUpperCase()}</strong>;
          default:
            return role;
        }
      },
    },
    {
      field: 'emailVerified',
      headerName: 'Email Verified',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        const emailVerified = params.row.emailConfirmedAt || '';
        if (emailVerified) {
          return <VerifiedUserIcon color="primary" />;
        }
        return <NotInterestedIcon color="error" />;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Registration date',
      width: 200,
      valueFormatter: (params: GridValueFormatterParams) => {
        const createdAt = String(params.value);
        return moment(createdAt).format('DD/MM/YYYY, HH:mm:ss');
      },
    },
    {
      field: 'deleteUser',
      headerName: '',
      width: 50,
      hideSortIcons: true,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ id, row }: GridValueGetterParams) => {
        if (idUserLegit(id, row.role)) {
          return null;
        }
        return <DeleteUser data={row} />;
      },
    },
  ];
  const restrictedCells: string[] = ['createdAt', 'role', '__check__'];
  const onCellClick = (params: GridCellParams) => {
    if (params.value && !restrictedCells.includes(params.field)) {
      prompt(params.field, String(params.value));
    }
  };
  const onSelectUsers = (model: GridSelectionModel) => {
    setSelectedUsers(model);
  };
  const onDeletedUsers = () => {
    setSelectedUsers([]);
  };
  const isRowSelectable = ({ id, row }: GridRowParams) => {
    if (idUserLegit(id, row.role)) {
      return false;
    }

    return true;
  };

  const { users } = data;

  return (
    <PageTmpl
      title="Users"
      tools={
        <Stack direction="row" spacing={2}>
          <DeleteUsers selectedUsersIds={selectedUsers as string[]} users={users} onDeletedUsers={onDeletedUsers} />
          <AddUser />
        </Stack>
      }>
      <Paper>
        {users.length ? (
          <DataGrid
            loading={loading}
            onCellClick={onCellClick}
            rows={users}
            columns={columns}
            autoHeight
            disableSelectionOnClick
            checkboxSelection
            onSelectionModelChange={onSelectUsers}
            isRowSelectable={isRowSelectable}
          />
        ) : (
          <Alert severity="warning">There are no users</Alert>
        )}
      </Paper>
    </PageTmpl>
  );
};

export default UsersList;
