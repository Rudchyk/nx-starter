import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!) {
    resetPassword(token: $token)
  }
`;

export default RESET_PASSWORD;
