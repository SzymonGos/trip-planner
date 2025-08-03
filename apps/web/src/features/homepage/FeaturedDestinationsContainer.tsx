import { PreloadQuery } from '@/lib/apolloClient';
import React from 'react';
import { FeaturedDestinations } from './FeaturedDestinations';
import { getHomePageRecommededTripsQuery } from '../trip/server/db/getHomePageRecommendedTrips';
import { Suspense } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { Container } from '@/components/Container/Container';
import { MultipleTripCardsLoader } from '../trip/components/MultipleTripCardsLoader';

export const FeaturedDestinationsContainer = () => (
  <Container className="my-40">
    <div className="w-full my-10">
      <h3 className="text-2xl font-semibold font-primary">Discover Travel Adventures</h3>
    </div>
    <PreloadQuery<{ trips: TTrip[] }, { id: string }>
      query={getHomePageRecommededTripsQuery}
      context={{
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      }}
    >
      {(queryRef) => (
        <Suspense fallback={<MultipleTripCardsLoader />}>
          <FeaturedDestinations queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  </Container>
);
