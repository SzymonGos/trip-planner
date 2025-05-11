import { gql } from '@apollo/client';

export const getTripsQuery = gql`
  query trips {
    trips {
      id
      title
      origin
      description
      destination
      creator {
        id
        username
      }
      distance
      estimatedDuration
    }
  }
`;
