'use client';

import React from 'react';
import { GoogleMaps } from './GoogleMaps';
import { AiChatSheetContainer } from '@/features/aichat/AiChatSheetContainer';

import { useParams, usePathname } from 'next/navigation';

export const GoogleMapsContainer = () => {
  const params = useParams();
  const pathname = usePathname();
  const tripId = params?.id as string;

  const isTripViewPage = pathname.startsWith(`/trip/${tripId}`);
  const canEdit = !isTripViewPage;

  return (
    <div className="w-full h-full relative">
      <AiChatSheetContainer />
      <GoogleMaps canEdit={canEdit} />
    </div>
  );
};
