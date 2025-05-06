import React from 'react';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Navbar } from './Navbar';

export const NavbarContainer = async () => {
  const user = await currentUser();
  const { userId: clerkId } = await auth();

  console.log(typeof user);
  console.log('clerkId', { clerkId });

  return <Navbar userName={user.username} clerkId={clerkId} />;
};
