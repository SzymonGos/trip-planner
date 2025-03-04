import { SignIn } from '@clerk/nextjs';
import React from 'react';

// export url
const SignInPage = () => <SignIn signUpUrl="/sign-up" />;

export default SignInPage;
