'use client';

import React, { FC } from 'react';
import { TripImagesDisplay } from './TripImagesDisplay';
import { TripImagesUpload } from './TripImagesUpload';
import { useTripImages } from '../../hooks/useTripImages';
import { TripImage as TTripImage } from 'tp-graphql-types';

export type TTripImagesManagerProps = {
  disabled?: boolean;
  images?: TTripImage[];
};

export const TripImagesManager: FC<TTripImagesManagerProps> = ({ disabled, images = [] }) => {
  const { canAddMore } = useTripImages();

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <TripImagesDisplay images={images} disabled={disabled} />

      {canAddMore && <TripImagesUpload disabled={disabled} />}
    </div>
  );
};
