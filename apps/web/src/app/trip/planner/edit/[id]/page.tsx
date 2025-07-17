import React from 'react';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';
import { query } from '@/lib/apolloClient';
import { EditTripFormContainer } from '@/features/trip/components/EditTrip/EditTripFormContainer';
import { headers } from 'next/headers';

const EditTripPage = async ({ params }: { params: { id: string } }) => {
  headers();
  const { data } = await query({
    query: getTripQuery,
    variables: {
      id: params.id,
    },
  });
  const tripData = data?.trip;

  return <EditTripFormContainer trip={tripData} />;
};

export default EditTripPage;
