import { gql } from '@apollo/client';

export const getTripsQuery = gql`
  query trips {
    trips {
      id
      title
      origin
      destination
      creator {
        id
        username
      }
    }
  }
`;
