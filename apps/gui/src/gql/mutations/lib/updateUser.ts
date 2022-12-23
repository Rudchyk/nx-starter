import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $role: role) {
    updateUser(id: $id, role: $role) {
      id
      email
      role
      createdAt
      emailConfirmedAt
    }
  }
`;

export default UPDATE_USER;
