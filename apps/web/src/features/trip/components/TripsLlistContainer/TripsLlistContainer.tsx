import { Container } from '@/components/Container/Container';
import { PreloadQuery } from '@/lib/apolloClient';
import React, { Suspense } from 'react';
import { getTripsQuery } from '../../server/db/getTripsQuery';
import { TripsList } from './TripsList';
import { Trip } from 'tp-graphql-types';

export const TripsLlistContainer = () => (
  <PreloadQuery<{ trips: Trip[] }, { id: string }> query={getTripsQuery}>
    {(queryRef) => (
      <Suspense fallback={<div>Loading trips...</div>}>
        <Container className="mt-24">
          <h3 className="flex w-full justify-center text-2xl font-bold">Browse All Trips</h3>
          <div className="mt-10 w-full grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <TripsList queryRef={queryRef} />
          </div>
        </Container>
      </Suspense>
    )}
  </PreloadQuery>
);
