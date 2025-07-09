import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';
import Link from 'next/link';

type TripCardUserDetailsProps = {
  username: string;
  profileImageId?: string;
};

export const TripCardUserDetails: FC<TripCardUserDetailsProps> = ({ username, profileImageId }) => (
  <div className="absolute group/user top-2 left-2 flex items-center gap-2 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md transition-all duration-300 group-hover:bg-white/90 z-20">
    <Link href={`/user/${username}`} className="cursor-pointer absolute inset-0 w-full h-full z-20" />
    {profileImageId ? (
      <CldImage
        src={getCloudinaryImageSrc(profileImageId)}
        width={100}
        height={100}
        className="w-[25px] h-[25px] rounded-full object-cover"
        alt={`${username}'s profile`}
      />
    ) : (
      <div className="w-[20px] h-[20px] rounded-full bg-gray-300 border flex items-center justify-center text-gray-500 text-xs font-bold" />
    )}
    <span className="font-semibold text-xs text-gray-700 truncate max-w-[80px] group-hover/user:text-gray-900">
      {username}
    </span>
  </div>
);
