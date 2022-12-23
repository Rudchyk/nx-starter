import { gql } from '@apollo/client';

export const RESEND_CONFIRMATION_EMAIL = gql`
  mutation ResendConfirmationEmail($id: ID!) {
    resendConfirmationEmail(id: $id)
  }
`;

export default RESEND_CONFIRMATION_EMAIL;
