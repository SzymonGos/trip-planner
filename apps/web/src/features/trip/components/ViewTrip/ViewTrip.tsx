'use client';

import React, { FC, useEffect } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { TripImagesCarouselContainer } from './TripImagesCarouselContainer';
import { UserProfileDetails } from '../UserProfileDetails';
import { TripStats } from '../TripStats';
import { TripStatus } from '../TripStatus';
import { SettingsLink } from '../SettingsLink';
import { TripTimeline } from './TripTimeline';

type TViewTripProps = {
  trip: TTrip;
};

export const ViewTrip: FC<TViewTripProps> = ({ trip }) => {
  const { setDirectionsValue } = useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const isOwner = trip?.creator?.id === authUserId;

  useEffect(() => {
    if (trip?.origin && trip?.destination) {
      setDirectionsValue({
        origin: trip.origin,
        destination: trip.destination,
      });
    }
  }, [trip, setDirectionsValue]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-8 px-5 border-r border-gray-200">
      <div className="flex-1 flex flex-col gap-4 max-w-xl">
        <h1 className="text-xl font-semibold mb-2 font-primary">{trip?.title}</h1>
        <div className="flex items-center gap-2 mb-3 justify-between">
          <TripStats
            distance={trip?.distance}
            estimatedDuration={trip?.estimatedDuration}
            createdAt={trip?.createdAt}
            iconSize="w-5 h-5"
            textSize="text-sm"
          />
          <div className="flex items-center gap-2 w-fit">
            <TripStatus status={trip?.status} />
            {isOwner && <SettingsLink tripId={trip?.id} />}
          </div>
        </div>
        <div className="w-fit">
          <UserProfileDetails
            username={trip?.creator?.username}
            profileImageId={trip?.creator?.profileImage?.id}
            className="mb-1"
            imageSize="w-[40px] h-[40px]"
            textSize="text-base"
          />
        </div>
        {trip?.description && (
          <p className="my-5 text-gray-600 text-base leading-relaxed font-normal whitespace-pre-line">
            {trip.description}
          </p>
        )}
        <TripTimeline origin={trip?.origin} destination={trip?.destination} />
        <div className="mt-4 -mx-5">
          <TripImagesCarouselContainer images={trip?.tripImages} />
        </div>
      </div>
    </div>
  );
};
