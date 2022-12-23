import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($token: String!) {
    signup(token: $token) {
      id
      email
      role
      createdAt
      emailConfirmedAt
    }
  }
`;

export default SIGNUP;
