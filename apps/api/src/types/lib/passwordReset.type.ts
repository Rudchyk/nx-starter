import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { CreatedAtType } from '@api/types';

export const PasswordResetType = new GraphQLObjectType({
  name: 'PasswordResetType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    code: { type: GraphQLString },
    createdAt: {
      type: CreatedAtType,
    },
  },
});
