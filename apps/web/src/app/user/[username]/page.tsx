import React from 'react';
import { getUserDataByUsernameQuery } from '@/features/user/server/db/getUserDataQuery';
import { query } from '@/lib/apolloClient';
import { headers } from 'next/headers';
import { Container } from '@/components/Container/Container';
import { UserDetails } from '@/features/user/components/UserDetails';
import UserProfileBanner from '@/features/user/components/UserProfileBanner';
import { UserTripsListContainer } from '@/features/user/components/UserTripsListContainer';

const UserPage = async ({ params }: { params: { username: string } }) => {
  headers();

  const { data: userData } = await query({
    query: getUserDataByUsernameQuery,
    variables: {
      username: params?.username?.trim(),
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
      <UserTripsListContainer userId={userData?.user?.id} username={userData?.user?.username} />
    </div>
  );
};
export default UserPage;
