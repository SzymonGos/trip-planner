import React, { FC } from 'react';
import { formatDate } from '@/features/trip/helpers/formatDate';
import { formatDuration } from '@/features/trip/helpers/formatDuration';
import { CalendarIcon } from '@/components/Icons/CalendarIcon';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { MapIcon } from '@/components/Icons/MapIcon';

type TTripCardFooterProps = {
  distance: string;
  estimatedDuration: string;
  createdAt: string;
};

export const TripCardFooter: FC<TTripCardFooterProps> = ({ distance, estimatedDuration, createdAt }) => (
  <div className="flex items-center text-gray-700 text-xs gap-4 mt-auto pt-4">
    <span className="flex items-center gap-1 text-xs">
      <MapIcon className="w-4 h-4" />
      {distance}
    </span>

    <span className="flex items-center gap-1 text-xs">
      <ClockIcon className="w-4 h-4" />
      {formatDuration(estimatedDuration)}
    </span>

    <span className="flex items-center gap-1 text-xs">
      <CalendarIcon className="w-4 h-4" />
      {formatDate(createdAt)}
    </span>
  </div>
);
