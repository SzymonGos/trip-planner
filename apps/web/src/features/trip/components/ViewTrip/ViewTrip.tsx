'use client';

import React, { FC, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trip as TTrip } from 'tp-graphql-types';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';

type TViewTripProps = {
  trip: TTrip;
};

export const ViewTrip: FC<TViewTripProps> = ({ trip }) => {
  const { setDirectionsValue } = useGoogleMapsDirections();

  useEffect(() => {
    if (trip?.origin && trip?.destination) {
      setDirectionsValue({
        origin: trip.origin,
        destination: trip.destination,
      });
    }
  }, [trip, setDirectionsValue]);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">{trip?.title}</div>
        <div>From: {trip?.origin}</div>
        <div>To: {trip?.destination}</div>
      </div>

      <div className="mt-4">
        <Link passHref href={`/trip/planner/edit/${trip.id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
};
