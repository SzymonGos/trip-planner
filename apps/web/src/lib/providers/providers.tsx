import React, { FC, ReactNode } from 'react';
import { ApolloWrapper } from './ApolloWrapper';
import { DirectionsProvider } from '../contexts/DirectionsContext';

type TProvidersProps = {
  children: ReactNode;
};

export const Providers: FC<TProvidersProps> = ({ children }) => (
  <>
    <ApolloWrapper>
      <DirectionsProvider>{children}</DirectionsProvider>
    </ApolloWrapper>
  </>
);
