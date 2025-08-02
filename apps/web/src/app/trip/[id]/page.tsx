import { PreloadQuery } from '@/lib/apolloClient';
import { ViewTripContainer } from '@/features/trip/components/ViewTrip/ViewTripContainer';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';
import { Suspense } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { ViewTripLoading } from '@/features/trip/components/ViewTrip/ViewTripLoading';

export const revalidate = 60;

const TripPage = ({ params }: { params: { id: string } }) => (
  <PreloadQuery<{ trip: TTrip }, { id: string }>
    query={getTripQuery}
    variables={{
      id: params.id,
    }}
  >
    {(queryRef) => (
      <Suspense fallback={<ViewTripLoading />}>
        <ViewTripContainer queryRef={queryRef} />
      </Suspense>
    )}
  </PreloadQuery>
);

export default TripPage;
