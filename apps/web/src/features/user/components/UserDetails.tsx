'use client';

import { User as TUser } from 'tp-graphql-types';
import React, { FC } from 'react';
import Link from 'next/link';
import { UserProfileImage } from './UserProfileImage';
import { SettingsIcon } from '@/components/Icons/SettingsIcon';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';

type UserDetailsProps = {
  user: TUser;
};

export const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  const { authUserId } = useAuthenticatedUser();
  const isOwnProfile = authUserId === user?.id;

  return (
    <div>
      <div className="flex flex-col items-center bg-white p-2 rounded-full w-fit">
        <div className="bg-gray-700 w-[150px] h-[150px] rounded-full">
          <UserProfileImage id={user?.profileImage?.id} />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <h3 className="text-2xl font-primary">{user?.username}</h3>
        {isOwnProfile && (
          <Link href="/user/settings" className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <SettingsIcon />
          </Link>
        )}
      </div>
    </div>
  );
};
