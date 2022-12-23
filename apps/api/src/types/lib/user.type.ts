import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLScalarType, GraphQLEnumType } from 'graphql';
import { UserRolesEnum } from '@constants';
import { CreatedAtType } from '@api/types';

const commonUserRoleValues = {
  [UserRolesEnum.admin]: { value: UserRolesEnum.admin },
  [UserRolesEnum.user]: { value: UserRolesEnum.user },
};

export const UserRoleType = new GraphQLEnumType({
  name: 'role',
  values: {
    ...commonUserRoleValues,
    [UserRolesEnum.super]: { value: UserRolesEnum.super },
  },
});

export const CommonUserRoleType = new GraphQLEnumType({
  name: 'commonRole',
  values: commonUserRoleValues,
});

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    role: { type: UserRoleType },
    createdAt: {
      type: CreatedAtType,
    },
    emailConfirmedAt: {
      type: new GraphQLScalarType({
        name: 'emailConfirmedAt',
      }),
    },
  },
});
