import Link from 'next/link';
import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { getTripUrl } from '../helpers/getTripUrl';
import { formatDate } from '@/features/trip/helpers/formatDate';

type TTripCardProps = {
  trip: TTrip;
};

export const TripCard: FC<TTripCardProps> = ({ trip }) => (
  <div className="relative w-full max-w-xs rounded-2xl border-[0.5px] bg-white overflow-hidden hover:border-none  hover:shadow-lg transition-transform duration-200">
    <Link href={getTripUrl(trip.id)} className="absolute z-10 w-full h-full inset-0" />
    <div className="relative w-full">
      {/* images here */}
      <div className="w-full h-48 object-cover rounded-t-2xl bg-slate-300" />
      <div className="absolute -bottom-2 left-0 w-full h-[30px] bg-white mask-wave" />

      <div className="absolute left-1/2 -bottom-5 transform -translate-x-1/2 bg-orange-500 text-white px-5 py-2 rounded-full shadow-md text-sm font-semibold hover:bg-orange-600 transition">
        France
      </div>
    </div>
    <div className="pt-8 pb-4 px-6 flex flex-col h-48">
      <div className="text-center">
        <h4 className="text-xl font-bold mb-1">{trip.title}</h4>
        <p className="line-clamp-3 font-secondary">{trip.description}</p>
      </div>
      <div className="flex justify-center items-center text-gray-300 text-xs gap-2 mt-auto pt-4">
        <span>{trip.distance}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full inline-block"></span>
        <span>{formatDate(trip.createdAt)}</span>
      </div>
    </div>
  </div>
);
