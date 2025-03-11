import React, { FC, ReactNode } from 'react';
import { ApolloWrapper } from './ApolloWrapper';
import { DirectionsProvider } from '../contexts/DirectionsContext';
import { ClerkProvider } from '@clerk/nextjs';

type TProvidersProps = {
  children: ReactNode;
};

export const Providers: FC<TProvidersProps> = ({ children }) => (
  <>
    <ClerkProvider>
      <ApolloWrapper>
        <DirectionsProvider>{children}</DirectionsProvider>
      </ApolloWrapper>
    </ClerkProvider>
  </>
);
