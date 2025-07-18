'use client';

import { Trip as TTrip } from 'tp-graphql-types';
import { TripCard } from '../trip/components/TripCard/TripCard';
import { FC } from 'react';
import { Container } from '@/components/Container/Container';
import { QueryRef, useReadQuery } from '@apollo/client';

type TFeaturedDestinationsProps = {
  queryRef: QueryRef<{ trips: TTrip[] }>;
};

export const FeaturedDestinations: FC<TFeaturedDestinationsProps> = ({ queryRef }) => {
  const { data } = useReadQuery(queryRef);
  const trips = data?.trips;

  return (
    <Container className="my-40">
      <div className="w-full my-10">
        <h3 className="text-2xl font-semibold font-primary">Discover Travel Adventures</h3>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {trips?.map((trip: TTrip) => <TripCard key={trip.id} trip={trip} />)}
      </div>
    </Container>
  );
};
