import Link from 'next/link';
import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { getTripUrl } from '../helpers/getTripUrl';

type TTripCardProps = {
  trip: TTrip;
};

export const TripCard: FC<TTripCardProps> = ({ trip }) => (
  <Link href={getTripUrl(trip.id)}>
    <div className="p-4 border rounded-lg mb-4">
      <h3 className="font-semibold">{trip.title}</h3>
      <p>From: {trip.origin}</p>
      <p>To: {trip.destination}</p>
    </div>
  </Link>
);
