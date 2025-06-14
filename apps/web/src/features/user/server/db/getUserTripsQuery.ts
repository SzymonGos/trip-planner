import { gql } from '@apollo/client';

export const getUserTripsQuery = gql`
  query trips($id: ID!) {
    trips(where: { creator: { id: { equals: $id } } }) {
      id
      title
      origin
      destination
      creator {
        id
        username
      }
      description
      distance
      estimatedDuration
      createdAt
    }
  }
`;
