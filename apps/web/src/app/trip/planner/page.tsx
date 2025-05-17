import { CreateTripFormContainer } from '@/features/trip/components/CreateTrip/CreateTripFormContainer';
import React from 'react';

const CreateTripPage = () => (
  <div className="px-8">
    <h1 className="mb-10 text-4xl font-secondary">Plan your trip</h1>
    <CreateTripFormContainer />
  </div>
);
export default CreateTripPage;
