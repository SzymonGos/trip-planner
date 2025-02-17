import React, { FC, ReactNode } from 'react';
import { ApolloWrapper } from './ApolloWrapper';
import { GoogleMapsProvider } from '../contexts/GoogleMapsContext';

type TProvidersProps = {
  children: ReactNode;
};

export const Providers: FC<TProvidersProps> = ({ children }) => (
  <>
    <ApolloWrapper>
      <GoogleMapsProvider>{children}</GoogleMapsProvider>
    </ApolloWrapper>
  </>
);
