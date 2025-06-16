'use client';

import React from 'react';
import { User } from 'tp-graphql-types';

type UserSettingsProps = {
  user?: User;
};

export const UserSettings = ({ user }: UserSettingsProps) => {
  if (!user) return null;

  return (
    <div>
      <h2>User Settings</h2>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
    </div>
  );
};
