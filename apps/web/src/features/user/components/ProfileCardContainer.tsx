'use client';

import React from 'react';
import { ProfileCard } from './ProfileCard';
import { QueryRef, useReadQuery } from '@apollo/client';
import { User as TUser } from 'tp-graphql-types';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { formatDate } from '@/features/trip/helpers/formatDate';

type ProfileCardContainerProps = {
  queryRef: QueryRef<{ user: TUser }>;
};

export const ProfileCardContainer = ({ queryRef }: ProfileCardContainerProps) => {
  const { data } = useReadQuery(queryRef);
  const user = data?.user;
  const { authUserId } = useAuthenticatedUser();
  const isOwnProfile = authUserId === user?.id;
  const memberSince = formatDate(data?.user?.createdAt);

  // todo: remove console.log
  console.log('user', user);
  console.log('isOwnProfile', isOwnProfile);
  console.log('memberSince', memberSince);
  console.log('authUserId', authUserId);

  return <ProfileCard user={user} isOwnProfile={isOwnProfile} memberSince={memberSince} />;
};
