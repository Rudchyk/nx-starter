import { gql } from '@apollo/client';

export const DELETE_CV = gql`
  mutation DeleteCv($id: ID!) {
    deleteCv(id: $id)
  }
`;

export default DELETE_CV;
