'use client';

import React from 'react';
import { GoogleMaps } from './GoogleMaps';
import { useParams, usePathname } from 'next/navigation';
import { TripDistanceInfo } from '@/features/trip/components/TripDistanceInfo/TripDistanceInfo';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { AiChatSheetContainer } from '@/features/aichat/AiChatSheetContainer';

export const GoogleMapsContainer = () => {
  const params = useParams();
  const pathname = usePathname();
  const tripId = params?.id as string;
  const { distanceInfo } = useGoogleMapsDirections();

  const isTripViewPage = pathname.startsWith(`/trip/${tripId}`);
  const isEditTripPlanner = pathname.startsWith('/trip/planner');
  const isEditTripPlannerEdit = pathname.startsWith('/trip/planner/edit/');
  const canEdit = !isTripViewPage;

  return (
    <>
      {distanceInfo && (isEditTripPlanner || isEditTripPlannerEdit) && (
        <TripDistanceInfo distance={distanceInfo.distance} duration={distanceInfo.duration} />
      )}
      <GoogleMaps canEdit={canEdit} />
      {canEdit && <AiChatSheetContainer />}
    </>
  );
};
