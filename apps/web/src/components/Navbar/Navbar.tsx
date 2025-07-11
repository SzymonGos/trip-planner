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
import { usePathname } from 'next/navigation';
import { isFullWidthNavbar } from '@/lib/utils';

interface NavbarClientProps {
  userName: string;
  clerkId: string;
}

export const Navbar = ({ userName, clerkId }: NavbarClientProps) => {
  const { isLoaded } = useUser();
  const scrollY = useScrollY();
  const pathname = usePathname();

  return (
    <div
      className={cx('fixed top-0 z-50 w-full bg-transparent py-6 transition-colors duration-200 font-secondary', {
        '!bg-tp-white-100': scrollY > 0,
      })}
    >
      <Container
        className={cx('flex', {
          '!max-w-none': isFullWidthNavbar(pathname),
        })}
      >
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
