import { gql } from '@apollo/client';

export const ADD_CV = gql`
  mutation AddCv($userId: ID!, $name: String!) {
    addCv(userId: $userId, name: $name) {
      id
      name
    }
  }
`;

export default ADD_CV;
