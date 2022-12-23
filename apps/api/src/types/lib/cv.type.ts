import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { CreatedAtType } from '@api/types';

export const CVType = new GraphQLObjectType({
  name: 'CVType',
  fields: {
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    createdAt: {
      type: CreatedAtType,
    },
  },
});
