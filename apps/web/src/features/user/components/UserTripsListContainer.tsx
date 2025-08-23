import React from 'react';
import { PreloadQuery } from '@/lib/apolloClient';
import { getUserTripsQuery } from '../server/db/getUserTripsQuery';
import { StatisticsCardsContainer } from './StatisticsCardsContainer';
import { UserTripsListClient } from './UserTripsListClient';
import { Trip as TTrip } from 'tp-graphql-types';
import { Suspense } from 'react';

type UserTripListContainerProps = {
  userId: string;
  username?: string;
};

export const UserTripsListContainer = ({ userId }: UserTripListContainerProps) => (
  <div className="col-span-full lg:col-span-9">
    <PreloadQuery<{ trips: TTrip[] }, { id: string }>
      query={getUserTripsQuery}
      variables={{
        id: userId,
      }}
    >
      {(queryRef) => (
        <Suspense fallback={<div className="col-span-full gap-4 mb-8"></div>}>
          <StatisticsCardsContainer queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>

    <UserTripsListClient userId={userId} />
  </div>
);
