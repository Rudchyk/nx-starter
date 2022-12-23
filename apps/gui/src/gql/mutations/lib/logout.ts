import { gql } from '@apollo/client';

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export default LOGOUT;
