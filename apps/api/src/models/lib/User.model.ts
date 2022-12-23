import { Document, Schema, model, Model } from 'mongoose';
import { User } from '@interfaces';
import { UserRolesEnum } from '@constants';
import { compare, getHash } from '@api/services';
import randomstring from 'randomstring';

export interface UserSchemaInterface extends User, Document {
  password: string;
  emailConfirmedAt: Date;
  emailConfirmedCode: string;
}

interface UserSchemaMethods {
  comparePassword(candidatePassword: string): boolean;
}

type UserModelInterface = Model<
  UserSchemaInterface,
  {
    [key: string]: any;
  },
  UserSchemaMethods
>;

const UserSchema = new Schema<UserSchemaInterface, UserModelInterface, UserSchemaMethods>({
  createdAt: Date,
  email: String,
  password: String,
  role: String,
  emailConfirmedAt: Date,
  emailConfirmedCode: String,
});

UserSchema.pre('save', function () {
  this.createdAt = new Date();

  if (this.email === process.env.NX_SUPER_USER) {
    this.role = UserRolesEnum.super;
  } else {
    this.role = this.role || UserRolesEnum.user;
  }

  this.password = getHash(this.password);
  this.emailConfirmedCode = randomstring.generate(72);
});

UserSchema.methods.comparePasswords = function (plainPassword: string) {
  return compare(plainPassword, this.password);
};

export const UserModel = model<UserSchemaInterface, UserModelInterface>('User', UserSchema);

export default UserModel;
