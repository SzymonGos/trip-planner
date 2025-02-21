import { GoogleMapsScriptProvider } from '@/features/googleMap/components/GoogleMapsScriptProvider';
import { CreateTripFormContainer } from '@/features/trip/components/CreateTrip/CreateTripFormContainer';
import React from 'react';

const CreateTripPage = () => (
  <div className="px-8">
    <GoogleMapsScriptProvider>
      <CreateTripFormContainer />
    </GoogleMapsScriptProvider>
  </div>
);

export default CreateTripPage;
