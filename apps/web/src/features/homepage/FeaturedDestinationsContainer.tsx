import { query } from '@/lib/apolloClient';
import React from 'react';
import { FeaturedDestinations } from './FeaturedDestinations';
import { headers } from 'next/headers';
import { getHomePageRecommededTripsQuery } from '../trip/server/db/getHomePageRecommendedTrips';

export const FeaturedDestinationsContainer = async () => {
  headers();
  const { data } = await query({
    query: getHomePageRecommededTripsQuery,
  });

  const trips = data?.trips;

  return <FeaturedDestinations trips={trips} />;
};
