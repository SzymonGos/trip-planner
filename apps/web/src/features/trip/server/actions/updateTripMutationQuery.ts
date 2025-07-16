import { gql } from '@apollo/client';

export const updateTripMutationQuery = gql`
  mutation updateTrip($where: TripWhereUniqueInput!, $data: TripUpdateInput!) {
    updateTrip(where: $where, data: $data) {
      id
      title
      origin
      destination
      distance
      estimatedDuration
      tripImages {
        id
        image {
          id
          publicUrl
          publicUrlTransformed
        }
      }
      status
      description
    }
  }
`;
