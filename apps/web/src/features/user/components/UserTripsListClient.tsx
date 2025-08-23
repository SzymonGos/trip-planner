import React from 'react';
import { PreloadQuery } from '@/lib/apolloClient';
import { getUserTripsQuery } from '../server/db/getUserTripsQuery';
import { UserTripsList } from './UserTripsList';
import { Suspense } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { MultipleTripCardsLoader } from '@/features/trip/components/MultipleTripCardsLoader';

type UserTripsListClientProps = {
  userId: string;
};

export const UserTripsListClient = ({ userId }: UserTripsListClientProps) => (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Trip History</h2>

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
  </div>
);
