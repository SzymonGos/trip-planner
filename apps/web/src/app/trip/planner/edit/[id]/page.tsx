import React from 'react';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';
import { PreloadQuery } from '@/lib/apolloClient';
import { EditTripFormContainer } from '@/features/trip/components/EditTrip/EditTripFormContainer';
import { Suspense } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';

const EditTripPage = ({ params }: { params: { id: string } }) => (
  <PreloadQuery<{ trip: TTrip }, { id: string }>
    query={getTripQuery}
    variables={{
      id: params.id,
    }}
  >
    {(queryRef) => (
      <Suspense fallback={<div>Loading trip...</div>}>
        <div className="h-screen">
          <EditTripFormContainer queryRef={queryRef} />
        </div>
      </Suspense>
    )}
  </PreloadQuery>
);

export default EditTripPage;
