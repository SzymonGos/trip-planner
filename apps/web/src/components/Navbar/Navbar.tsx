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
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

interface NavbarClientProps {
  userName: string;
  clerkId: string;
}

export const Navbar = ({ userName, clerkId }: NavbarClientProps) => {
  const { isLoaded } = useUser();
  const pathname = usePathname();
  const isTripPages = pathname.startsWith('/trip/');
  const scrollY = useScrollY();

  return (
    <div
      className={cx('fixed top-0 z-50 w-full py-6 font-primary font-medium', {
        'transition-colors duration-200 bg-tp-white-100 border-b-tp-gray-100 shadow-md': scrollY > 0,
        'border-b-tp-gray-100 bg-tp-white-100 shadow-md': isTripPages && scrollY >= 0,
      })}
    >
      <Container
        className={cx('flex', {
          '!max-w-none': isFullWidthNavbar(pathname),
        })}
      >
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo/routetripper-logo-2.svg" alt="route tripper logo" width={200} height={40} />
          </Link>
        </div>

        <div className="flex gap-3 items-center ml-auto">
          <ul className="flex gap-3">
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.url} className="hover:text-zinc-600">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {isLoaded ? (
            <div className="w-[157px] h-[38px]">
              <SignedIn>
                <UserMenu userName={userName} clerkId={clerkId} />
              </SignedIn>
              <SignedOut>
                <NavbarSignInLink />
              </SignedOut>
            </div>
          ) : (
            <Skeleton className="w-[157px] h-[38px]" />
          )}
        </div>
      </Container>
    </div>
  );
};
