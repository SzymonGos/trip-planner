import { ViewTrip } from '@/features/trip/components/ViewTrip/ViewTrip';
import { getTripQuery } from '@/features/trip/server/db/getTripQuery';
import { getClient } from '@/lib/apolloClient';

const Trip = async ({ params }: { params: { id: string } }) => {
  const client = getClient();
  const { data } = await client.query({
    query: getTripQuery,
    variables: {
      id: params.id,
    },
  });

  return (
    <div>
      View Trip
      <ViewTrip data={data?.trip} />
    </div>
  );
};

export default Trip;
