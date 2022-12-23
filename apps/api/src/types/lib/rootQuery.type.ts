import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType, PasswordResetType, CVType } from '@api/types';
import { UserModel } from '@api/models';
import { confirmEmail, verifyResetPassword } from '@api/services';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    authUser: {
      type: UserType,
      resolve: (_, args, req) => req.user,
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => UserModel.findById(id),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => UserModel.find({}),
    },
    confirmedEmail: {
      type: GraphQLString,
      args: { code: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (_, { code }) => confirmEmail(code),
    },
    verifyResetPassword: {
      type: PasswordResetType,
      args: { code: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_, { code }) => verifyResetPassword(code),
    },
  }),
});
