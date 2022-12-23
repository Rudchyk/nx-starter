import { gql } from '@apollo/client';

export const UPDATE_CV = gql`
  mutation UpdateCv($id: ID!, $name: String, $slug: String) {
    updateCv(id: $id, name: $name, slug: $slug) {
      id
      name
      slug
      createdAt
      userId
    }
  }
`;

export default UPDATE_CV;
