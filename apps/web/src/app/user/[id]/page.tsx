import React from 'react';
import { getUserDataQuery } from '@/features/user/server/db/getUserDataQuery';
import { getUserTripsQuery } from '@/features/user/server/db/getUserTripsQuery';
import { query } from '@/lib/apolloClient';

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { data: userData } = await query({
    query: getUserDataQuery,
    variables: {
      id: params.id.trim(),
    },
  });
  const { data: tripsData } = await query({
    query: getUserTripsQuery,
    variables: {
      id: params.id.trim(),
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <div>
        <p>{userData?.user?.username}</p>
      </div>
      <div className="w-full px-1 border-[0.5px] border-slate-200" />
      <div className="w-full">
        {tripsData?.trips?.map((trip) => (
          <div key={trip.id} className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold">{trip.title}</h3>
            <p>From: {trip.origin}</p>
            <p>To: {trip.destination}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserPage;
