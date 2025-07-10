import React, { FC } from 'react';
import cx from 'classnames';
import { formatDate } from '@/features/trip/helpers/formatDate';
import { formatDuration } from '@/features/trip/helpers/formatDuration';
import { CalendarIcon } from '@/components/Icons/CalendarIcon';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { MapIcon } from '@/components/Icons/MapIcon';

type TTripStatsProps = {
  distance: string;
  estimatedDuration: string;
  createdAt: string;
  iconSize?: string;
  textSize?: string;
};

export const TripStats: FC<TTripStatsProps> = ({
  distance,
  estimatedDuration,
  createdAt,
  iconSize = 'w-4 h-4',
  textSize = 'text-xs',
}) => (
  <div className={cx('flex items-center text-gray-700 gap-4', textSize)}>
    <span className="flex items-center gap-1">
      <MapIcon className={iconSize} />
      {distance}
    </span>

    <span className="flex items-center gap-1">
      <ClockIcon className={iconSize} />
      {formatDuration(estimatedDuration)}
    </span>

    <span className="flex items-center gap-1">
      <CalendarIcon className={iconSize} />
      {formatDate(createdAt)}
    </span>
  </div>
);
