import React from 'react';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Navbar } from './Navbar';

export const NavbarContainer = async () => {
  let user = null;
  let clerkId = null;

  try {
    user = await currentUser();
    const authResult = await auth();
    clerkId = authResult.userId;
  } catch (error) {
    console.log('User not found or error fetching user data:', error);
  }

  return <Navbar userName={user?.username} clerkId={clerkId} />;
};
