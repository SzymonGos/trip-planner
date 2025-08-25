'use client';

import React from 'react';
import { ProfileCard } from './ProfileCard';
import { QueryRef, useReadQuery } from '@apollo/client';
import { User as TUser } from 'tp-graphql-types';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { useUser } from '@clerk/nextjs';
import { formatDate } from '@/features/trip/helpers/formatDate';

type ProfileCardContainerProps = {
  queryRef: QueryRef<{ user: TUser }>;
};

export const ProfileCardContainer = ({ queryRef }: ProfileCardContainerProps) => {
  const { data } = useReadQuery(queryRef);
  const user = data?.user;
  const { authUserId } = useAuthenticatedUser();
  const { user: clerkUser } = useUser();
  const isOwnProfile = authUserId === user?.id;
  const memberSince = formatDate(clerkUser?.createdAt);

  return <ProfileCard user={user} isOwnProfile={isOwnProfile} memberSince={memberSince} />;
};
