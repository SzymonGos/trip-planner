import { gql } from '@apollo/client';

export const getHomePageRecommededTripsQuery = gql`
  query trips {
    trips(take: 4) {
      id
      title
      description
      origin
      destination
      creator {
        id
        username
      }
      distance
      estimatedDuration
      createdAt
    }
  }
`;
