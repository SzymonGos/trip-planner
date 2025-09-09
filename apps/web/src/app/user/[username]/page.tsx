import React, { Suspense } from 'react';
import { getUserDataByUsernameQuery } from '@/features/user/server/db/getUserDataQuery';
import { query } from '@/lib/apolloClient';
import { Container } from '@/components/Container/Container';
import { UserTripsListContainer } from '@/features/user/components/UserTripsListContainer';
import { PreloadQuery } from '@/lib/apolloClient';
import { User as TUser } from 'tp-graphql-types';
import { getUserDataQuery } from '@/features/user/server/db/getUserDataQuery';
import { ProfileCardContainer } from '@/features/user/components/ProfileCardContainer';
import { ProfileCardLoader } from '@/features/user/components/ProfileCardLoader';
import { Footer } from '@/components/Footer/Footer';

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { data: userData } = await query({
    query: getUserDataByUsernameQuery,
    variables: {
      username: params?.username?.trim(),
    },
  });

  return (
    <div className="min-h-screen mt-5 py-8 ">
      <Container className="mt-10 px-0 grid grid-cols-4 lg:grid-cols-12 gap-8 relative">
        <PreloadQuery<{ user: TUser }, { id: string }>
          query={getUserDataQuery}
          variables={{
            id: userData?.user?.id,
          }}
          context={{
            fetchOptions: {
              next: {
                revalidate: 60,
              },
            },
          }}
        >
          {(queryRef) => (
            <Suspense fallback={<ProfileCardLoader />}>
              <div className="col-span-full lg:col-span-3 relative">
                <ProfileCardContainer queryRef={queryRef} />
              </div>
            </Suspense>
          )}
        </PreloadQuery>

        <UserTripsListContainer userId={userData?.user?.id} username={userData?.user?.username} />
      </Container>
      <Footer />
    </div>
  );
};
export default UserPage;
