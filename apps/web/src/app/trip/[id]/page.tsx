import { ViewTrip } from '@/features/trip/components/ViewTrip/ViewTrip';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';
import { query } from '@/lib/apolloClient';
import { headers } from 'next/headers';

const TripPage = async ({ params }: { params: { id: string } }) => {
  headers();
  const { data } = await query({
    query: getTripQuery,
    variables: {
      id: params.id,
    },
  });

  return <ViewTrip trip={data?.trip} />;
};

export default TripPage;
