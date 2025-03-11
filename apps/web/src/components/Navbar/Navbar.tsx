import React from 'react';
import { NavbarSignInLink } from './NavbarSignInLink';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { UserMenu } from './UserMenu';

export const Navbar = async () => {
  const user = await currentUser();
  const { userId: clerkId } = await auth();

  return (
    <div className="flex w-full bg-white p-6 border-b">
      <div>Navbar Logo</div>

      <div className="ml-auto">
        <SignedIn>
          <UserMenu userName={user?.username} clerkId={clerkId} />
        </SignedIn>
        <SignedOut>
          <NavbarSignInLink />
        </SignedOut>
      </div>
    </div>
  );
};
