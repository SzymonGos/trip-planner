import React, { Suspense } from 'react';
import { getUserDataByUsernameQuery } from '@/features/user/server/db/getUserDataQuery';
import { query } from '@/lib/apolloClient';
import { headers } from 'next/headers';
import { Container } from '@/components/Container/Container';
import { UserTripsListContainer } from '@/features/user/components/UserTripsListContainer';
import { PreloadQuery } from '@/lib/apolloClient';
import { User as TUser } from 'tp-graphql-types';
import { getUserDataQuery } from '@/features/user/server/db/getUserDataQuery';
import { ProfileCard } from '@/features/user/components/ProfileCard';

const UserPage = async ({ params }: { params: { username: string } }) => {
  headers();

  const { data: userData } = await query({
    query: getUserDataByUsernameQuery,
    variables: {
      username: params?.username?.trim(),
    },
  });

  return (
    <div className="min-h-screen mt-5 py-8 ">
      <Container className="mt-10 px-0 grid grid-cols-4 lg:grid-cols-12 gap-8">
        <PreloadQuery<{ user: TUser }, { id: string }>
          query={getUserDataQuery}
          variables={{
            id: userData?.user?.id,
          }}
        >
          {(queryRef) => (
            <Suspense fallback={<div className="bg-white rounded-lg p-6 shadow-sm border animate-pulse h-80" />}>
              <div className="col-span-full lg:col-span-3">
                <ProfileCard queryRef={queryRef} />
              </div>
            </Suspense>
          )}
        </PreloadQuery>

        <UserTripsListContainer userId={userData?.user?.id} username={userData?.user?.username} />
      </Container>
    </div>
  );
};
export default UserPage;
