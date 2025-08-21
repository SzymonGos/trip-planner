'use client';

import React from 'react';
import { useReadQuery } from '@apollo/client';
import { StatisticsCard } from './StatisticsCard';
import { MapIcon } from '@/components/Icons/MapIcon';
import { ClockIcon } from '@/components/Icons/ClockIcon';

const statisticsCards = [
  {
    title: 'Total Distance',
    value: '0km',
    icon: <MapIcon className="w-7 h-7 text-tp-primary" />,
  },
  {
    title: 'Total Trips',
    value: '0',
    icon: <ClockIcon className="w-7 h-7 text-tp-primary" />,
  },
];

export const StatisticsCardsContainer = ({ queryRef }) => {
  const { data } = useReadQuery(queryRef);
  // TODO: get total distance and total trips from the data

  console.log(data);
  return (
    <div className="grid grid-flow-col gap-4">
      {statisticsCards.map((card) => (
        <StatisticsCard key={card.title} title={card.title} value={card.value} icon={card.icon} />
      ))}
    </div>
  );
};
