'use client';

import React, { FC } from 'react';
import { useReadQuery, QueryRef } from '@apollo/client';
import { Trip as TTrip } from 'tp-graphql-types';
import { TripCard } from '@/features/trip/components/TripCard/TripCard';
import { EmptyTripsState } from '../../trip/EmptyTripsState';
import { isEmpty } from 'lodash';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';

type TUserTripsListProps = {
  queryRef: QueryRef<{ trips: TTrip[] }>;
};

export const UserTripsList: FC<TUserTripsListProps> = ({ queryRef }) => {
  const { data } = useReadQuery(queryRef);
  const trips = data?.trips;
  const { authUserId } = useAuthenticatedUser();

  if (isEmpty(trips)) {
    return <EmptyTripsState authUserId={authUserId} />;
  }

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-3 ">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};
