'use client';

import React, { FC } from 'react';
import { useReadQuery, QueryRef } from '@apollo/client';
import { Trip as TTrip } from 'tp-graphql-types';
import { Container } from '@/components/Container/Container';
import { TripCard } from '@/features/trip/components/TripCard/TripCard';
import { UserTripsTitle } from './UserTripsTitle';

type TUserTripsListProps = {
  queryRef: QueryRef<{ trips: TTrip[] }>;
  username?: string;
};

export const UserTripsList: FC<TUserTripsListProps> = ({ queryRef, username }) => {
  const { data } = useReadQuery(queryRef);
  const trips = data?.trips;

  if (!trips) {
    return <div>Loading trips...</div>;
  }

  return (
    <Container className="mt-10 px-0">
      <UserTripsTitle username={username} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </Container>
  );
};
