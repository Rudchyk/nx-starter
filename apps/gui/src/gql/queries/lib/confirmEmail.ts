import { gql } from '@apollo/client';

export const CONFIRM_EMAIL = gql`
  query confirmEmail($code: String!) {
    confirmedEmail(code: $code)
  }
`;

export default CONFIRM_EMAIL;
