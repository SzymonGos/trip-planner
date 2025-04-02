import React from 'react';
import { TripCard } from '@/features/trip/components/TripCard';
import { getTripsQuery } from '@/features/trip/server/db/getTripsQuery';
import { Trip as TTrip } from 'tp-graphql-types';
import { query } from '@/lib/apolloClient';
import { headers } from 'next/headers';
import { TripsWrapper } from './TripsWrapper';

const TripsPage = async () => {
  headers();
  const { data } = await query({
    query: getTripsQuery,
  });

  const trips = data?.trips;

  return (
    <TripsWrapper>
      <div className="w-full flex flex-col items-center">
        {trips?.map((trip: TTrip) => <TripCard key={trip?.id} trip={trip} />)}
      </div>
    </TripsWrapper>
  );
};

export default TripsPage;
