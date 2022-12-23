import { gql } from '@apollo/client';

export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [ID]!) {
    deleteUsers(ids: $ids)
  }
`;

export default DELETE_USERS;
