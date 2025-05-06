import React from 'react';
import { TripCard } from '@/features/trip/components/TripCard';
import { getTripsQuery } from '@/features/trip/server/db/getTripsQuery';
import { Trip as TTrip } from 'tp-graphql-types';
import { query } from '@/lib/apolloClient';
import { headers } from 'next/headers';
import { TripsWrapper } from './TripsWrapper';
import { Container } from '@/components/Container/Container';

const TripsPage = async () => {
  headers();
  const { data } = await query({
    query: getTripsQuery,
  });

  const trips = data?.trips;

  return (
    <TripsWrapper>
      <Container className="mt-24">
        <h3 className="flex w-full justify-center text-2xl font-bold">Browse All Trips</h3>
        <div className="w-full grid grid-cols-4 items-center">
          {trips?.map((trip: TTrip) => <TripCard key={trip?.id} trip={trip} />)}
        </div>
      </Container>
    </TripsWrapper>
  );
};

export default TripsPage;
