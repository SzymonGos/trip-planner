'use client';

import React from 'react';
import { GoogleMaps } from './GoogleMaps';
import { useParams, usePathname } from 'next/navigation';

export const GoogleMapsContainer = () => {
  const params = useParams();
  const pathname = usePathname();
  const tripId = params?.id as string;

  const isTripViewPage = pathname.startsWith(`/trip/${tripId}`);
  const canEdit = !isTripViewPage;

  return <GoogleMaps canEdit={canEdit} />;
};
