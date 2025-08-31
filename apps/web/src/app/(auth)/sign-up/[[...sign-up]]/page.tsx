import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Footer } from '@/components/Footer/Footer';

const SignUpPage = async () => (
  <>
    <SignUp />
    <Footer />
  </>
);

export default SignUpPage;
