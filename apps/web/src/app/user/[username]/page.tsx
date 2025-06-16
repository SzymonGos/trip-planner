import React from 'react';
import { getUserDataByUsernameQuery } from '@/features/user/server/db/getUserDataQuery';
import { getUserTripsQuery } from '@/features/user/server/db/getUserTripsQuery';
import { query } from '@/lib/apolloClient';
import { UserPageWrapper } from '@/features/user/components/UserPageWrapper';
import { headers } from 'next/headers';
import { TripCard } from '@/features/trip/components/TripCard';
import { Container } from '@/components/Container/Container';
import { UserDetails } from '@/features/user/components/UserDetails';

const UserPage = async ({ params }: { params: { username: string } }) => {
  headers();

  const { data: userData } = await query({
    query: getUserDataByUsernameQuery,
    variables: {
      username: params?.username?.trim(),
    },
  });

  const { data: tripsData } = await query({
    query: getUserTripsQuery,
    variables: {
      id: userData.user?.id,
    },
  });

  return (
    <div className="min-h-screen mt-10 p-8 pb-20 sm:p-20">
      <Container className="my-10">
        <UserDetails user={userData?.user} />
      </Container>
      <UserPageWrapper>
        <Container className="mt-10 px-0">
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
            {tripsData?.trips?.map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </Container>
      </UserPageWrapper>
    </div>
  );
};
export default UserPage;
