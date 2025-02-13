import React, { ReactNode } from 'react';

// for the google component use dynamic import from next/dynamic

const TripPageLayout = ({ children }: { children: ReactNode }) => (
  <div className="h-[calc(100vh-73px)]">
    <div className="flex h-full">
      <div className="w-full mt-10 lg:w-[500px]">{children}</div>
      <div className="hidden lg:block my-10 flex-1 border-l">Google Maps</div>
    </div>
  </div>
);

export default TripPageLayout;
