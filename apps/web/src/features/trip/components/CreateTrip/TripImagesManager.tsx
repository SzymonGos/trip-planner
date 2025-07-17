'use client';

import React, { FC } from 'react';
import { TripImagesDisplay } from './TripImagesDisplay';
import { useTripImages } from '../../hooks/useTripImages';
import { TTripImageFormValueProps } from './CreateTripFormContainer';
import { TripImagesUploadContainer } from './TripImagesUploadContainer';

export type TTripImagesManagerProps = {
  disabled?: boolean;
  images?: TTripImageFormValueProps[];
  tripId?: string;
};

export const TripImagesManager: FC<TTripImagesManagerProps> = ({ disabled, images = [], tripId }) => {
  const { canAddMore, handleNewImagesChange } = useTripImages();

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <TripImagesDisplay images={images} disabled={disabled} tripId={tripId} />

      <TripImagesUploadContainer disabled={disabled} onFilesChange={handleNewImagesChange} canAddMore={canAddMore} />
    </div>
  );
};
