import { gql } from '@apollo/client';

export const FETCH_CVS = gql`
  query fetchCVs($userId: ID!) {
    cvs(userId: $userId) {
      id
      name
      slug
      createdAt
      userId
    }
  }
`;

export default FETCH_CVS;
