import { query } from '@/lib/apolloClient';
import { headers } from 'next/headers';
import { ViewTripContainer } from '@/features/trip/components/ViewTrip/ViewTripContainer';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';

const TripPage = async ({ params }: { params: { id: string } }) => {
  headers();
  const { data } = await query({
    query: getTripQuery,
    variables: {
      id: params.id,
    },
  });

  return <ViewTripContainer trip={data?.trip} />;
};

export default TripPage;
