'use client';

import Link from 'next/link';
import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { getTripUrl } from '../../helpers/getTripUrl';
import { TripStats } from '../TripStats';
import { TripCardUserDetails } from './TripCardUserDetails';
import { TripCardImage } from './TripCardImage';
import { TripCardDetails } from './TripCardDetails';
import { TripCardMaskWave } from './TripCardMaskWave';

type TTripCardProps = {
  trip: TTrip;
};

export const TripCard: FC<TTripCardProps> = ({ trip }) => (
  <div className="relative group rounded-md border-[0.5px] border-gray-300 bg-zinc-100 hover:bg-white overflow-hidden transition-all duration-200 ease-out z-0">
    <Link href={getTripUrl(trip.id)} className="absolute z-10 w-full h-full inset-0" />
    <div className="relative w-full">
      <TripCardImage id={trip.tripImages[0]?.image?.id} />
      <div className="z-20">
        <TripCardUserDetails username={trip.creator?.username} profileImageId={trip.creator?.profileImage?.id} />
      </div>
      <TripCardMaskWave />
    </div>
    <div className="pt-4 pb-4 px-6 flex flex-col h-48">
      <TripCardDetails title={trip.title} description={trip.description} />
      <div className="mt-auto">
        <TripStats distance={trip.distance} estimatedDuration={trip.estimatedDuration} createdAt={trip.createdAt} />
      </div>
    </div>
  </div>
);
