import React from 'react';
import { getUserDataByUsernameQuery } from '@/features/user/server/db/getUserDataQuery';
import { getUserTripsQuery } from '@/features/user/server/db/getUserTripsQuery';
import { query } from '@/lib/apolloClient';
import { UserPageWrapper } from '@/features/user/components/UserPageWrapper';
import { headers } from 'next/headers';
import { TripCard } from '@/features/trip/components/TripCard/TripCard';
import { Container } from '@/components/Container/Container';
import { UserDetails } from '@/features/user/components/UserDetails';
import UserProfileBanner from '@/features/user/components/UserProfileBanner';
import { UserTripsTitle } from '@/features/user/components/UserTripsTitle';

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
    <div className="min-h-screen mt-5 p-8 pb-20">
      <Container className="my-10">
        <UserProfileBanner />
        <div className="-mt-[75px] ml-[50px] relative z-10">
          <UserDetails user={userData?.user} />
        </div>
      </Container>
      <div className="my-20" />
      <UserPageWrapper>
        <Container className="mt-10 px-0">
          <UserTripsTitle username={userData?.user?.username} />
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
            {tripsData?.trips?.map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </Container>
      </UserPageWrapper>
    </div>
  );
};
export default UserPage;
