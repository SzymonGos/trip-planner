import React from 'react';

interface UserTripsTitleProps {
  username?: string;
}

export const UserTripsTitle: React.FC<UserTripsTitleProps> = ({ username }) => (
  <h2 className="text-2xl font-semibold mb-8">{username ? `${username}'s Trips` : 'Trips'}</h2>
);
