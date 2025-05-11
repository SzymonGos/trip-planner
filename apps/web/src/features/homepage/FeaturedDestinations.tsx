import { Trip as TTrip } from 'tp-graphql-types';
import { TripCard } from '../trip/components/TripCard';
import { FC } from 'react';
import { Container } from '@/components/Container/Container';

type TFeaturedDestinationsProps = {
  trips: TTrip[];
};

export const FeaturedDestinations: FC<TFeaturedDestinationsProps> = ({ trips }) => (
  <Container className="my-40">
    <div className="w-full flex items-center justify-center my-10">
      <h3 className="text-2xl font-bold">Discover Travel Adventures</h3>
    </div>

    <div className="grid gap-5 grid-cols-4">{trips?.map((trip: TTrip) => <TripCard key={trip.id} trip={trip} />)}</div>
  </Container>
);
