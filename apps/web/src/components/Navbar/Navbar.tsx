import React from 'react';
import { NavbarSignInLink } from './NavbarSignInLink';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import { navbarLinks } from '../config';

export const Navbar = async () => {
  const user = await currentUser();
  const { userId: clerkId } = await auth();

  return (
    <div className="flex w-full bg-white p-6 border-b">
      <div className="flex justify-between">
        <Link href="/">Navbar Logo</Link>
      </div>

      <div className="flex gap-3 items-center ml-auto">
        <ul className="flex gap-3">
          {navbarLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>
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
