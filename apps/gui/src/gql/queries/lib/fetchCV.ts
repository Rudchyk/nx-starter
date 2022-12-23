import { gql } from '@apollo/client';

export const FETCH_CV = gql`
  query fetchCV($id: ID!) {
    cv(id: $id) {
      id
      name
      slug
      createdAt
      userId
    }
  }
`;

export default FETCH_CV;
