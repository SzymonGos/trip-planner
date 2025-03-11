import React from 'react';
import { getUserDataQuery } from '@/features/user/server/db/getUserDataQuery';
import { getClient } from '@/lib/apolloClient';

const UserPage = async ({ params }: { params: { id: string } }) => {
  const client = getClient();
  const { data } = await client.query({
    query: getUserDataQuery,
    variables: {
      id: params.id.trim(),
    },
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <div>
        <p>{data?.user?.username}</p>
      </div>
    </div>
  );
};
export default UserPage;
