import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($token: String!) {
    addUser(token: $token) {
      id
      email
      role
      createdAt
      emailConfirmedAt
    }
  }
`;

export default ADD_USER;
