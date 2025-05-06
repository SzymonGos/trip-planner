import Link from 'next/link';
import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { getTripUrl } from '../helpers/getTripUrl';

type TTripCardProps = {
  trip: TTrip;
};

export const TripCard: FC<TTripCardProps> = ({ trip }) => (
  <div className="relative max-w-xs rounded-2xl border-[0.5px] bg-white overflow-hidden hover:border-none hover:-translate-y-1 hover:shadow-lg transition-transform duration-200">
    <Link href={getTripUrl(trip.id)} className="absolute z-10 w-full h-full inset-0" />
    <div className="relative">
      <div className="w-full h-48 object-cover object-top rounded-t-2xl bg-slate-500" />
      <div className="absolute left-1/2 -bottom-5 transform -translate-x-1/2 bg-orange-500 text-white px-5 py-2 rounded-full shadow-md text-sm font-semibold hover:bg-orange-600 transition">
        France
      </div>
    </div>
    <div className="pt-8 pb-4 px-6 text-center">
      <h4 className="text-xl font-bold mb-1">{trip.title}</h4>

      <div className="flex justify-center items-center text-gray-300 text-xs gap-2">
        <span>{trip.distance}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full inline-block"></span>
        <span>29 - June - 2021</span>
      </div>
    </div>
  </div>
);
