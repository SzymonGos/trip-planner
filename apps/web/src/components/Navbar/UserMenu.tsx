'use client';

import { SignOutButton, useAuth } from '@clerk/nextjs';
import React, { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { getUserIdByClerkIdQuery } from '@/features/user/server/db/getUserIdByClerkIdQuery';
import { SettingsIcon } from '../Icons/SettingsIcon';

type TUserMenuProps = {
  userName: string;
  clerkId: string;
};

export const UserMenu: FC<TUserMenuProps> = ({ userName, clerkId }) => {
  const { sessionId } = useAuth();

  const { data } = useQuery(getUserIdByClerkIdQuery, {
    variables: {
      clerkId: clerkId,
    },
  });

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button variant="ghost">{userName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem asChild>
            <Link href={`/user/${data?.user?.username}`} className="cursor-pointer">
              My Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/user/settings" className="cursor-pointer flex items-center gap-2">
              <SettingsIcon />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton signOutOptions={{ sessionId }}>
              <span className="w-full cursor-pointer">Sign out</span>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
