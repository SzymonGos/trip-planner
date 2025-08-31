import React from 'react';
import { TripsLlistContainer } from '@/features/trip/components/TripsLlistContainer/TripsLlistContainer';
import { Footer } from '@/components/Footer/Footer';

export const revalidate = 60;

const TripsPage = () => (
  <div>
    <TripsLlistContainer />
    <Footer />
  </div>
);

export default TripsPage;
