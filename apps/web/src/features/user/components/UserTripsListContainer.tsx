import React from 'react';
import { PreloadQuery } from '@/lib/apolloClient';
import { getUserTripsQuery } from '../server/db/getUserTripsQuery';
import { UserTripsList } from './UserTripsList';
import { Suspense } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';

type UserTripListContainerProps = {
  userId: string;
  username?: string;
};

export const UserTripsListContainer = ({ userId, username }: UserTripListContainerProps) => (
  <PreloadQuery<{ trips: TTrip[] }, { id: string }>
    query={getUserTripsQuery}
    variables={{
      id: userId,
    }}
  >
    {(queryRef) => (
      <Suspense fallback={<div>Loading trips...</div>}>
        <UserTripsList queryRef={queryRef} username={username} />
      </Suspense>
    )}
  </PreloadQuery>
);
