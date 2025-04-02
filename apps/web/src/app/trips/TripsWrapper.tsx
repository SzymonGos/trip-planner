'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type TTripsWrapperProps = {
  children: React.ReactNode;
};

export const TripsWrapper = ({ children }: TTripsWrapperProps) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <div>{children}</div>;
};
