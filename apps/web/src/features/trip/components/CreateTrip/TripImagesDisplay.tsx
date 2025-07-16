'use client';

import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { Trash2 } from 'lucide-react';
import { getCloudinaryImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';
import { useTripImages } from '../../hooks/useTripImages';
import { TripImage as TTripImage } from 'tp-graphql-types';

export type TTripImagesDisplayProps = {
  className?: string;
  disabled?: boolean;
  images: TTripImage[];
};

export const TripImagesDisplay: FC<TTripImagesDisplayProps> = ({ className, disabled, images }) => {
  const { handleExistingImagesRemove } = useTripImages();

  const handleRemove = (imageId: string) => {
    if (!disabled) {
      handleExistingImagesRemove(imageId);
    }
  };

  return (
    <div className={`flex gap-2 items-center flex-wrap ${className || ''}`}>
      {images.map((img) => (
        <div
          key={img.id}
          className="relative w-20 h-20 flex flex-col items-center justify-center border rounded-md overflow-hidden group bg-muted"
        >
          <CldImage
            src={getCloudinaryImageSrc(img?.id)}
            alt={`Trip image ${img.image?.filename}`}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={() => handleRemove(img.image?.id)}
            aria-label="Remove image"
            disabled={disabled}
          >
            <Trash2 size={16} className="text-destructive" />
          </button>
        </div>
      ))}
    </div>
  );
};
