'use client';

import Link from 'next/link';
import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { getTripUrl } from '../../helpers/getTripUrl';
import { CldImage } from 'next-cloudinary';
import { TripCardFooter } from './TripCardFooter';

type TTripCardProps = {
  trip: TTrip;
};

export const TripCard: FC<TTripCardProps> = ({ trip }) => (
  <div className="relative group rounded-md border-[0.5px] border-gray-200 bg-white overflow-hidden transition-transform duration-200 hover:bg-gray-100">
    <Link href={getTripUrl(trip.id)} className="absolute z-10 w-full h-full inset-0" />
    <div className="relative w-full">
      <div className="relative w-full h-[200px] object-cover rounded-t-md bg-gray-500 overflow-hidden">
        {trip.tripImages[0]?.image ? (
          <CldImage
            src={trip.tripImages[0]?.image?.publicUrlTransformed || trip.tripImages[0]?.image?.publicUrl}
            alt="Trip main"
            fill
            className="object-cover rounded-t-md"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400" />
        )}
        <div className="absolute top-2 left-2 flex items-center gap-2 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <div className="w-[20px] h-[20px] rounded-full bg-gray-300 border flex items-center justify-center text-gray-500 text-xs font-bold" />
          <span className="font-semibold text-xs text-gray-700 truncate max-w-[80px]">{trip.creator?.username}</span>
        </div>
      </div>
      <div className="absolute -bottom-2 left-0 w-full h-[30px] bg-white group-hover:bg-gray-100 mask-wave" />

      <div className="absolute left-1/2 -bottom-5 transform -translate-x-1/2 bg-gray-900 text-white px-5 py-2 rounded-full shadow-md text-sm font-semibold hover:bg-orange-600">
        France
      </div>
    </div>
    <div className="pt-8 pb-4 px-6 flex flex-col h-48">
      <div>
        <h4 className="text-xl font-semibold mb-1 text-gray-800 line-clamp-1">{trip.title}</h4>
        <p className="line-clamp-2 font-secondary text-gray-700 text-sm">{trip.description}</p>
      </div>
      <TripCardFooter distance={trip.distance} estimatedDuration={trip.estimatedDuration} createdAt={trip.createdAt} />
    </div>
  </div>
);
