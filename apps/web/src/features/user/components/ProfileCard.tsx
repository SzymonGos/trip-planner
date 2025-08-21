'use client';

import React from 'react';
import { User as TUser } from 'tp-graphql-types';
import { UserProfileImage } from './UserProfileImage';
import { useReadQuery, QueryRef } from '@apollo/client';
import { SettingsIcon } from '@/components/Icons/SettingsIcon';
import Link from 'next/link';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';

type ProfileCardProps = {
  queryRef: QueryRef<{ user: TUser }>;
};

export const ProfileCard = ({ queryRef }: ProfileCardProps) => {
  const { data } = useReadQuery(queryRef);
  const user = data?.user;
  const { authUserId } = useAuthenticatedUser();
  const isOwnProfile = authUserId === user?.id;
  const memberSince = 'Jan 2024';

  if (!user) {
    return <div className="bg-white rounded-lg p-6 shadow-sm border animate-pulse h-80" />;
  }

  return (
    <div className="bg-tp-white-100 rounded-lg p-6 border col-span-3 h-fit">
      <div className="flex flex-col items-center">
        <UserProfileImage id={user?.profileImage?.id} />

        <div className="text-center mt-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-900">{user?.username}</h3>
            {isOwnProfile && (
              <Link href="/user/settings" className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <SettingsIcon className="!w-6 !h-6" />
              </Link>
            )}
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mt-2">
            Member
          </div>
        </div>

        <div className="w-full mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Member since</div>
            <div className="text-gray-900 font-medium">{memberSince}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Role</div>
            <div className="text-gray-900 font-medium">Traveler</div>
          </div>
        </div>
      </div>
    </div>
  );
};
