import React, { FC, ReactNode } from "react";
import { ApolloWrapper } from "./ApolloWrapper";

type TProvidersProps = {
  children: ReactNode;
};

export const Providers: FC<TProvidersProps> = ({ children }) => {
  return (
    <>
      <ApolloWrapper>{children}</ApolloWrapper>
    </>
  );
};
