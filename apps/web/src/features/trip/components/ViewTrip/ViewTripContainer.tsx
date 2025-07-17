'use client';

import React, { FC, useEffect, useState } from 'react';
import { ViewTrip } from './ViewTrip';
import { Trip as TTrip } from 'tp-graphql-types';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';

type TViewTripContainerProps = {
  trip: TTrip;
};

export const ViewTripContainer: FC<TViewTripContainerProps> = ({ trip }) => {
  const { setDirectionsValue } = useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const isOwner = trip?.creator?.id === authUserId;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (trip?.origin && trip?.destination) {
      setDirectionsValue({
        origin: trip.origin,
        destination: trip.destination,
      });
    }
  }, [trip, setDirectionsValue]);

  return <ViewTrip trip={trip} isOwner={isOwner} expanded={expanded} setExpanded={setExpanded} />;
};
