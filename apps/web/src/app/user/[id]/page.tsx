import React from 'react';
import { getUserDataQuery } from '@/features/user/server/db/getUserDataQuery';
import { getUserTripsQuery } from '@/features/user/server/db/getUserTripsQuery';
import { query } from '@/lib/apolloClient';
import { UserPageWrapper } from '@/features/user/components/UserPageWrapper';
import { headers } from 'next/headers';
import { TripCard } from '@/features/trip/components/TripCard';

const UserPage = async ({ params }: { params: { id: string } }) => {
  headers();
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
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <p>{userData?.user?.username}</p>
      </div>
      <UserPageWrapper>
        <div className="w-full px-1 border-[0.5px] border-slate-200" />
        <div className="w-full">{tripsData?.trips?.map((trip) => <TripCard key={trip.id} trip={trip} />)}</div>
      </UserPageWrapper>
    </div>
  );
};
export default UserPage;
