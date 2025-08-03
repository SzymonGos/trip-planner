import React from 'react';
import { PreloadQuery } from '@/lib/apolloClient';
import { getUserTripsQuery } from '../server/db/getUserTripsQuery';
import { UserTripsList } from './UserTripsList';
import { Suspense } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { UserTripsTitle } from './UserTripsTitle';
import { Container } from '@/components/Container/Container';
import { MultipleTripCardsLoader } from '@/features/trip/components/MultipleTripCardsLoader';

type UserTripListContainerProps = {
  userId: string;
  username?: string;
};

export const UserTripsListContainer = ({ userId, username }: UserTripListContainerProps) => (
  <Container className="mt-10 px-0">
    <UserTripsTitle username={username} />
    <PreloadQuery<{ trips: TTrip[] }, { id: string }>
      query={getUserTripsQuery}
      variables={{
        id: userId,
      }}
    >
      {(queryRef) => (
        <Suspense fallback={<MultipleTripCardsLoader />}>
          <UserTripsList queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  </Container>
);
