import { gql } from '@apollo/client';

export const AUTH_USER = gql`
  {
    authUser {
      id
      email
      role
      createdAt
      emailConfirmedAt
    }
  }
`;

export default AUTH_USER;
