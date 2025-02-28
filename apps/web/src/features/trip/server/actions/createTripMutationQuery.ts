import { gql } from '@apollo/client';

export const createTripMutationQuery = gql`
  mutation createTrip($data: TripCreateInput!) {
    createTrip(data: $data) {
      id
    }
  }
`;
