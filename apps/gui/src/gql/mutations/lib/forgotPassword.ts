import { gql } from '@apollo/client';

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export default FORGOT_PASSWORD;
