import { gql } from '@apollo/client';

export const FETCH_USER = gql`
  query fetchUser($id: ID!) {
    user(id: $id) {
      id
      email
      role
      createdAt
      emailConfirmedAt
    }
  }
`;

export default FETCH_USER;
