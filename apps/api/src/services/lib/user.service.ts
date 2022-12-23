import { UserModel, PasswordResetModel } from '@api/models';
import { UserRolesEnum } from '@constants';
import { verifyToken, validateUserEmail, getHash, logout, getItem, updateItem, sendConfirmationEmail } from '@api/services';

export const getUser = async (id: string) => getItem(UserModel, id);

export interface AddUserParams {
  token: string;
  origin: string;
}

export const addUser = async ({ token, origin }: AddUserParams) => {
  try {
    const decodedUser = await verifyToken(token);

    await validateUserEmail(decodedUser.email);

    const user = await UserModel.create(decodedUser);

    await sendConfirmationEmail(user, origin);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (id, params) => updateItem(UserModel, id, params);
