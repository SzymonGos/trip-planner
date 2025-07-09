import React, { FC } from 'react';

type TTripCardDetailsProps = {
  title: string;
  description: string;
};
export const TripCardDetails: FC<TTripCardDetailsProps> = ({ title, description }) => (
  <div className="pt-4 pb-4 px-6 flex flex-col h-48">
    <h4 className="text-xl font-semibold mb-1 text-gray-800 line-clamp-1 transition-colors duration-300 group-hover:text-gray-900">
      {title}
    </h4>
    <p className="line-clamp-2 font-secondary text-gray-700 text-sm transition-colors duration-300 group-hover:text-gray-800">
      {description}
    </p>
  </div>
);
