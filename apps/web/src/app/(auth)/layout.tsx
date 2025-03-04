import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
    <div className="absolute inset-0 backdrop-blur-[2px] h-full w-full z-0" />
    {children}
  </div>
);

export default AuthLayout;
