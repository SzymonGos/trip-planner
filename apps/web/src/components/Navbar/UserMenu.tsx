'use client';

import { SignOutButton, useAuth } from '@clerk/nextjs';
import React, { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { getUserIdByClerkIdQuery } from '@/features/user/server/db/getUserIdByClerkIdQuery';

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
          <DropdownMenuItem>
            <Link href={`/user/${data?.user?.id}`}>My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton signOutOptions={{ sessionId }} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
