import { PreloadQuery } from '@/lib/apolloClient';
import React from 'react';
import { FeaturedDestinations } from './FeaturedDestinations';
import { getHomePageRecommededTripsQuery } from '../trip/server/db/getHomePageRecommendedTrips';
import { Suspense } from 'react';

export const FeaturedDestinationsContainer = () => (
  <PreloadQuery query={getHomePageRecommededTripsQuery} variables={{}}>
    {(queryRef) => (
      <Suspense fallback={<div>Loading featured destinations...</div>}>
        <FeaturedDestinations queryRef={queryRef} />
      </Suspense>
    )}
  </PreloadQuery>
);
