import { gql } from '@apollo/client';

export const getTripQuery = gql`
  query trip($id: ID!) {
    trip(where: { id: $id }) {
      id
      title
      origin
      destination
    }
  }
`;
