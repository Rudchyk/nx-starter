import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($token: String!) {
    changePassword(token: $token)
  }
`;

export default CHANGE_PASSWORD;
