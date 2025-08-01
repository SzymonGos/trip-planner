import React, { ReactNode } from 'react';
import { GoogleMapsContainer } from '@/features/googleMap/components/GoogleMapsContainer';

const TripPageLayout = ({ children }: { children: ReactNode }) => (
  <div className="h-screen">
    <div className="flex h-full">
      <div className="w-full lg:w-[500px]">{children}</div>
      <div className="hidden lg:block flex-1">
        <GoogleMapsContainer />
      </div>
    </div>
  </div>
);
export default TripPageLayout;
