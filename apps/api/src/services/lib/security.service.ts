import * as bcrypt from 'bcrypt';
import { s } from '@constants';
import { jwsVerify, jwsDecode } from '@utils';
import { UserModel } from '@api/models';

export const getHash = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

export const verifyToken = async (token: string) => {
  try {
    if (!(await jwsVerify(token, s.client))) {
      throw new Error('Token is not valid');
    }

    const { payloadObj } = await jwsDecode(token);

    return payloadObj;
  } catch (error) {
    throw new Error(error);
  }
};

export const validateUserEmail = async (email: string) => {
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('Email is in use');
    }

    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSecuredStr = (str: string) => Buffer.from(str).toString('base64');

export const decodeSecuredStr = (str: string) => Buffer.from(str, 'base64').toString('ascii').split(':');

export const compare = bcrypt.compareSync;
