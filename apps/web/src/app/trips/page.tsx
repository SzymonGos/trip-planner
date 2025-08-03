import React from 'react';
import { TripsLlistContainer } from '@/features/trip/components/TripsLlistContainer/TripsLlistContainer';

export const revalidate = 60;

const TripsPage = () => (
  <div className="h-screen">
    <TripsLlistContainer />
  </div>
);

export default TripsPage;
