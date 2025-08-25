import React from 'react';
import { PreloadQuery } from '@/lib/apolloClient';
import { getUserCompletedTripsQuery } from '../server/db/getUserCompletedTripsQuery';
import { StatisticsCardsContainer } from './StatisticsCardsContainer';
import { UserTripsListClient } from './UserTripsListClient';
import { Trip as TTrip } from 'tp-graphql-types';
import { Suspense } from 'react';
import { StatiticsCardLoader } from './StatiticsCardLoader';

type UserTripListContainerProps = {
  userId: string;
  username?: string;
};

export const UserTripsListContainer = ({ userId }: UserTripListContainerProps) => (
  <div className="col-span-full lg:col-span-9">
    <PreloadQuery<{ trips: TTrip[] }, { id: string }>
      query={getUserCompletedTripsQuery}
      variables={{
        id: userId,
      }}
    >
      {(queryRef) => (
        <Suspense fallback={<StatiticsCardLoader />}>
          <StatisticsCardsContainer queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>

    <UserTripsListClient userId={userId} />
  </div>
);
