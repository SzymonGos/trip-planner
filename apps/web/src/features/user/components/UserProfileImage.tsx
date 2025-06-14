import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImageSrc } from '../utils/getCloudinaryImageSrc';

type TUserProfileImageProfileProps = {
  id: string;
};

export const UserProfileImage: FC<TUserProfileImageProfileProps> = ({ id }) => (
  <CldImage
    src={getCloudinaryImageSrc(id)}
    width={100}
    height={100}
    className="w-full h-full rounded-full object-cover"
    alt="User profile"
  />
);
