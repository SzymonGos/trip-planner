'use client';

import { User as TUser } from 'tp-graphql-types';
import React, { FC } from 'react';
import { UserProfileImage } from './UserProfileImage';

type UserDetailsProps = {
  user: TUser;
};

export const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  console.log({ user });
  return (
    <div className="flex items-center gap-4">
      <div className=" bg-gray-700 w-[100px] h-[100px] rounded-full">
        <UserProfileImage id={user?.profileImage?.id} />
      </div>
      <h3 className="text-2xl">{user?.username}</h3>
    </div>
  );
};
