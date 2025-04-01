import { ViewTrip } from '@/features/trip/components/ViewTrip/ViewTrip';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';
import { query } from '@/lib/apolloClient';

const TripPage = async ({ params }: { params: { id: string } }) => {
  const { data } = await query({
    query: getTripQuery,
    variables: {
      id: params.id,
    },
  });

  return (
    <div>
      <ViewTrip data={data?.trip} />
    </div>
  );
};

export default TripPage;
