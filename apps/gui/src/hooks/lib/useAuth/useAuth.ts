import { useQuery } from '@apollo/client';
import { AUTH_USER } from '@gui/queries';
import { AuthUserResponse } from '@interfaces';
import { useMemo } from 'react';
import { UserRolesEnum } from '@constants';

export const useAuth = () => {
  const { loading, error, data } = useQuery<AuthUserResponse>(AUTH_USER);
  const adminsList: string[] = [UserRolesEnum.admin, UserRolesEnum.super];
  const isAdmin = useMemo(() => {
    if (!data?.authUser) {
      return false;
    }

    return adminsList.includes(data.authUser?.role);
  }, [data]);
  const isSuper = useMemo(() => {
    if (!data?.authUser) {
      return false;
    }

    return data.authUser?.role === UserRolesEnum.super;
  }, [data]);

  return {
    isAuthorization: loading,
    isAuthorized: Boolean(data?.authUser),
    authError: error,
    authUser: data?.authUser,
    isAdmin,
    isSuper,
  };
};
