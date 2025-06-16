import { SignIn } from '@clerk/nextjs';
import React from 'react';
import { getRedirectUrl } from '@/lib/auth/getRedirectUrl';

const SignInPage = () => <SignIn signUpUrl="/sign-up" fallbackRedirectUrl={getRedirectUrl()} />;

export default SignInPage;
