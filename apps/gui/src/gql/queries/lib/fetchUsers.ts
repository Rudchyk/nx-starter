import { gql } from '@apollo/client';

export const FETCH_USERS = gql`
  {
    users {
      id
      email
      role
      createdAt
      emailConfirmedAt
    }
  }
`;

export default FETCH_USERS;
