import React from 'react';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';
import { query } from '@/lib/apolloClient';
import { CreateTripFormContainer } from '@/features/trip/components/CreateTrip/CreateTripFormContainer';

const EditTripPage = async ({ params }: { params: { id: string } }) => {
  const { data } = await query({
    query: getTripQuery,
    variables: {
      id: params.id,
    },
  });
  const tripData = data?.trip;

  return (
    <div>
      <CreateTripFormContainer tripData={tripData} />
    </div>
  );
};

export default EditTripPage;
