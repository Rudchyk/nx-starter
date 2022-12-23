import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { UserType, CommonUserRoleType } from '@api/types';
import { UserModel } from '@api/models';
import { addUser, updateUser } from '@api/services';

export const usersMutations = {
  deleteUsers: {
    type: new GraphQLList(GraphQLString),
    args: { ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) } },
    resolve: async (_, { ids }) => {
      try {
        const query = {
          _id: {
            $in: ids,
          },
        };
        const users = await UserModel.find(query);

        await UserModel.deleteMany({
          _id: {
            $in: ids,
          },
        });

        return users.map(({ email }) => email);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  deleteUser: {
    type: GraphQLString,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_, { id }) => {
      try {
        const { email } = await UserModel.findByIdAndDelete(id);

        return email;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  addUser: {
    type: UserType,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_, params) => addUser(params),
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      role: { type: CommonUserRoleType },
    },
    resolve: (_, { id, ...params }) => updateUser(id, params),
  },
};

export default usersMutations;
