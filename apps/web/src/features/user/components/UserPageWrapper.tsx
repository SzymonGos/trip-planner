'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type TUserPageWrapperProps = {
  children: React.ReactNode;
};

export const UserPageWrapper = ({ children }: TUserPageWrapperProps) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4"></div>
      {children}
    </div>
  );
};
