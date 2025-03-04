import React from 'react';
import { NavbarSignInLink } from './NavbarSignInLink';
import { getClient } from '@/lib/apolloClient';
import { getUserDataQuery } from '@/features/navbar/queries/getUserData';
import { auth } from '@clerk/nextjs/server';

export const Navbar = async () => {
  const { userId: clerkId } = await auth();

  const client = getClient();
  const { data } = await client.query({
    query: getUserDataQuery,
    variables: {
      clerkId: clerkId,
    },
  });

  return (
    <div className="flex w-full bg-white py-6 border-b">
      <div>Navbar Logo</div>
      <div className="ml-auto">{data ? data.user.username : <NavbarSignInLink />}</div>
    </div>
  );
};
