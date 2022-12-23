import { GraphQLObjectType } from 'graphql';
import { authMutations, usersMutations } from '@api/mutations';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...authMutations,
    ...usersMutations,
    // mutation
  },
});

export default mutation;
