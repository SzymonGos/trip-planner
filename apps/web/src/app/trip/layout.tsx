import React, { ReactNode } from 'react';
import { GoogleMaps } from '@/features/googleMap/components/GoogleMaps';

const TripPageLayout = ({ children }: { children: ReactNode }) => (
  <div className="mt-[72px] h-[calc(100vh-73px)]">
    <div className="flex h-full">
      <div className="w-full mt-10 lg:w-[500px]">{children}</div>
      <div className="hidden lg:block my-10 flex-1 border-l">
        <GoogleMaps />
      </div>
    </div>
  </div>
);
export default TripPageLayout;
