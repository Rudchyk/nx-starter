import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { UserType } from '@api/types';
import { login, signup, logout, forgotPassword, resetPassword, changePassword, resendConfirmationEmail } from '@api/services';

export const authMutations = {
  signup: {
    type: UserType,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, { token }, req) => signup({ token, req }),
  },
  login: {
    type: UserType,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, { token }, req) => login({ token, req }),
  },
  logout: {
    type: GraphQLString,
    resolve: (_, args, req) => logout(req),
  },
  forgotPassword: {
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, { email }, req) => forgotPassword(email, req),
  },
  resetPassword: {
    type: GraphQLString,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, { token }) => resetPassword(token),
  },
  changePassword: {
    type: GraphQLString,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, { token }, req) => changePassword(token, req),
  },
  resendConfirmationEmail: {
    type: GraphQLString,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, { id }, req) => resendConfirmationEmail(id, req),
  },
};

export default authMutations;
