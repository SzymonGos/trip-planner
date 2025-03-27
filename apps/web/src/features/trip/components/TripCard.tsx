import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';

type TTripCardProps = {
  trip: TTrip;
};

export const TripCard: FC<TTripCardProps> = ({ trip }) => <div>{trip.title}</div>;
