'use client';

import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import React from 'react';
import { UserSettings } from './UserSettings';
import { useQuery } from '@apollo/client';
import { getUserDataQuery } from '../server/db/getUserDataQuery';

export const UserSettingsContainer = () => {
  const { authUserId } = useAuthenticatedUser();

  const { data, loading, error } = useQuery(getUserDataQuery, {
    variables: {
      id: authUserId,
    },
    skip: !authUserId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user settings</div>;

  return <UserSettings user={data?.user} />;
};
