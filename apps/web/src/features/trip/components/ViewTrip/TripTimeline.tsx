import React, { FC } from 'react';

type TTripTimelineProps = {
  origin: string;
  destination: string;
};

export const TripTimeline: FC<TTripTimelineProps> = ({ origin, destination }) => (
  <div className="my-8 relative">
    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">Origin</p>
          <div className="text-gray-900">{origin}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-tp-red-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
          <p className="text-white text-xs font-bold">B</p>
        </div>
        <div>
          <div className="text-sm text-gray-600 font-medium">Destination</div>
          <div className="text-gray-900">{destination}</div>
        </div>
      </div>
    </div>
  </div>
);
