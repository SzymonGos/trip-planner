import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const ViewTripLoading = () => (
  <div className="pt-24 h-full flex flex-col md:flex-row gap-8 px-5 border-r border-tp-gray-100">
    <div className="flex-1 flex flex-col gap-4 max-w-xl">
      <Skeleton className="h-8 w-3/4 mb-2" />
      <div className="flex items-center gap-2 mb-3 justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex items-center gap-3 mb-5">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-5 space-y-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="mt-4 -mx-5">
        <Skeleton className="h-64 w-full rounded-none" />
      </div>
    </div>
  </div>
);
