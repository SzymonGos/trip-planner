import { Container } from '@/components/Container/Container';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getRedirectUrl } from '@/lib/auth/getRedirectUrl';
import React from 'react';

const UserSettingsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent(getRedirectUrl('/user/settings'))}`);
  }

  return (
    <section className="mt-40">
      <Container>
        <h1 className="mb-10 text-4xl">Personal Information</h1>
        User Settings
      </Container>
    </section>
  );
};

export default UserSettingsPage;
