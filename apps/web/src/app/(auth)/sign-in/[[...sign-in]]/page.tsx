import { SignIn } from '@clerk/nextjs';
import React from 'react';
import { getRedirectUrl } from '@/lib/auth/getRedirectUrl';
import { Footer } from '@/components/Footer/Footer';

const SignInPage = () => (
  <>
    <SignIn signUpUrl="/sign-up" fallbackRedirectUrl={getRedirectUrl()} />
    <Footer />
  </>
);

export default SignInPage;
