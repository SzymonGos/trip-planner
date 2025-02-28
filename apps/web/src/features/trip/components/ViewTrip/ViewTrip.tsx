'use client';

import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';

import React, { FC, useEffect } from 'react';

type TViewTripProps = {
  data: {
    id: string;
    title: string;
    origin: string;
    destination: string;
  };
};

export const ViewTrip: FC<TViewTripProps> = ({ data }) => {
  const { setDirectionsValue } = useGoogleMapsDirections();

  useEffect(() => {
    setDirectionsValue({
      origin: data.origin,
      destination: data.destination,
    });
  }, [data, setDirectionsValue]);

  return (
    <div>
      <div>Trip Title: {data?.title}</div>
      <div>Trip From: {data?.origin}</div>
      <div>Trip To: {data?.destination}</div>
    </div>
  );
};
