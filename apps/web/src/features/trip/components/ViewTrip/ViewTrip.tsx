'use client';

import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import cx from 'classnames';
import { TripImagesCarouselContainer } from './TripImagesCarouselContainer';
import { UserProfileDetails } from '../UserProfileDetails';
import { TripStats } from '../TripStats';
import { TripStatus } from '../TripStatus';
import { SettingsLink } from '../SettingsLink';
import { TripTimeline } from './TripTimeline';
import { ReadMoreButton } from '../ReadMoreButton';

export type TViewTripProps = {
  trip: TTrip;
  isOwner: boolean;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

export const ViewTrip: FC<TViewTripProps> = ({ trip, isOwner, expanded, setExpanded }) => (
  <div className="h-full flex flex-col md:flex-row gap-8 px-5 border-r border-gray-200">
    <div className="flex-1 flex flex-col gap-4 max-w-xl">
      <h1 className="text-[22px] font-semibold mb-2 font-primary">{trip?.title}</h1>
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
        <div className="my-5">
          <p
            className={cx('text-gray-600 text-base leading-relaxed font-normal whitespace-pre-line', {
              'line-clamp-3': !expanded,
            })}
          >
            {trip.description}
          </p>
          <ReadMoreButton expanded={expanded} setExpanded={setExpanded} />
        </div>
      )}
      <TripTimeline origin={trip?.origin} destination={trip?.destination} />
      <div className="mt-4 -mx-5">
        <TripImagesCarouselContainer images={trip?.tripImages} />
      </div>
    </div>
  </div>
);
