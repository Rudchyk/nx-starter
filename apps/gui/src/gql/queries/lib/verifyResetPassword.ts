import { gql } from '@apollo/client';

export const VERIFY_RESET_PASSWORD = gql`
  query verifyResetPassword($code: String!) {
    verifyResetPassword(code: $code) {
      id
      email
      createdAt
    }
  }
`;

export default VERIFY_RESET_PASSWORD;
