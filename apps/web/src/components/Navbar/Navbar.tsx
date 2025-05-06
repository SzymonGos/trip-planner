'use client';

import React from 'react';
import { NavbarSignInLink } from './NavbarSignInLink';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import { navbarLinks } from '../config';
import { Container } from '../Container/Container';
import cx from 'classnames';
import { useScrollY } from '@/hooks/useScrollY';

interface NavbarClientProps {
  userName: string;
  clerkId: string;
}

export const Navbar = ({ userName, clerkId }: NavbarClientProps) => {
  const { isLoaded } = useUser();
  const scrollY = useScrollY();

  return (
    <div
      className={cx('fixed top-0 z-50 w-full bg-transparent p-6 transition-colors duration-200', {
        '!bg-white': scrollY > 0,
      })}
    >
      <Container className="flex">
        <div className="">
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
          {isLoaded ? (
            <>
              <SignedIn>
                <UserMenu userName={userName} clerkId={clerkId} />
              </SignedIn>
              <SignedOut>
                <NavbarSignInLink />
              </SignedOut>
            </>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </Container>
    </div>
  );
};
