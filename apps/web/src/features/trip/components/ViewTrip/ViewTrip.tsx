'use client';

import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { Trip as TTrip } from 'tp-graphql-types';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { SettingsIcon } from '@/components/Icons/SettingsIcon';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { TripImagesCarouselContainer } from './TripImagesCarouselContainer';
import { UserProfileDetails } from '../UserProfileDetails';

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

  // TODO: style & export components, cleanup

  return (
    <div className="h-full flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col gap-4 max-w-xl">
        {/* Trip Title */}
        <div className="text-2xl font-bold mb-1">{trip?.title}</div>
        {/* Status badge and settings cog below title */}
        <div className="flex items-center gap-2 mb-3 w-fit">
          {trip?.status && (
            <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium">
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </span>
          )}
          {isOwner && (
            <Link
              href={`/trip/planner/edit/${trip?.id}`}
              aria-label="Edit trip"
              tabIndex={0}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              title="Edit trip"
            >
              <SettingsIcon />
            </Link>
          )}
        </div>
        <UserProfileDetails
          username={trip?.creator?.username}
          profileImageId={trip?.creator?.profileImage?.id}
          className="mb-1"
          imageSize="w-[45px] h-[45px]"
          textSize="text-base"
        />
        {/* Trip Description */}
        {trip?.description && <div className="mb-2 text-gray-700 whitespace-pre-line">{trip.description}</div>}
        {/* Trip Info */}
        <div className="flex flex-col gap-1">
          <div>From: {trip?.origin}</div>
          <div>To: {trip?.destination}</div>
        </div>
        {/* Statistics Section with extra spacing */}
        <div className="my-8">
          <div className="font-semibold text-lg mb-3">Statistics</div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-base">
                Length: <span className="font-medium">{trip?.distance}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base">
                Duration: <span className="font-medium">{trip?.estimatedDuration}</span>
              </span>
            </div>
          </div>
          <hr className="mt-5" />
        </div>
        {/* Images Section */}
        <div className="mt-4">
          <TripImagesCarouselContainer images={trip?.tripImages || []} />
        </div>
      </div>
    </div>
  );
};
