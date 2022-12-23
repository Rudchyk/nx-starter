import { UserRolesEnum } from '@constants';

export type UserRoles = keyof typeof UserRolesEnum;

export interface User {
  createdAt: Date;
  email: string;
  role: UserRoles;
}

export interface UserItem extends User {
  emailConfirmedAt: Date | null;
  id: string;
}
