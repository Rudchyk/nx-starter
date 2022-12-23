import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($token: String!) {
    login(token: $token) {
      id
      email
      role
      createdAt
      emailConfirmedAt
    }
  }
`;

export default LOGIN;
