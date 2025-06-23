import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImageSrc } from '../utils/getCloudinaryImageSrc';

type TUserProfileImageProfileProps = {
  id: string;
};

export const UserProfileImage: FC<TUserProfileImageProfileProps> = ({ id }) => (
  <>
    {id ? (
      <CldImage
        src={getCloudinaryImageSrc(id)}
        width={150}
        height={150}
        className="w-full h-full rounded-full object-cover"
        alt="User profile"
      />
    ) : (
      <div className="h-[100px] w-[100px] rounded-full bg-gray-300" />
    )}
  </>
);
