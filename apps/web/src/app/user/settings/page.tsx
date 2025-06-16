import { Container } from '@/components/Container/Container';
import React from 'react';
import { UserSettingsContainer } from '@/features/user/components/UserSettingsContainer';
import { forceSignIn } from '@/lib/auth/forceSignIn';

const UserSettingsPage = async () => {
  await forceSignIn('/user/settings');

  return (
    <section className="mt-40">
      <Container>
        <h1 className="mb-10 text-4xl">Personal Information</h1>
        <UserSettingsContainer />
      </Container>
    </section>
  );
};

export default UserSettingsPage;
