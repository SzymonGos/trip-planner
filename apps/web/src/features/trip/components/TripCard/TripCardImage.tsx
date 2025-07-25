import { getCloudinaryImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import React, { FC } from 'react';

const DEFAULT_TRIP_IMAGE = '/images/compass-146166_640.png';

type TTripCardImageProps = {
  id: string;
};

export const TripCardImage: FC<TTripCardImageProps> = ({ id }) => (
  <div className="relative w-full h-[200px] object-cover overflow-hidden">
    {id ? (
      <CldImage
        src={getCloudinaryImageSrc(id)}
        alt="Trip main"
        fill
        className="object-cover rounded-t-md transition-transform duration-500 ease-out group-hover:scale-105"
        priority={false}
      />
    ) : (
      <Image
        src={DEFAULT_TRIP_IMAGE}
        fill
        className="object-bottom bg-gray-50 transition-transform duration-500 ease-out group-hover:scale-105"
        alt="Default trip image"
        priority={false}
      />
    )}
  </div>
);
