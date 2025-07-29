import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';

type TUsernameTriggerProps = {
  userName: string;
  profileImageId: string;
};

export const UsernameTrigger: FC<TUsernameTriggerProps> = ({ userName, profileImageId }) => (
  <div className="font-primary flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition-all duration-200 hover:bg-white/90 capitalize">
    {userName}
    <CldImage
      src={getCloudinaryImageSrc(profileImageId)}
      alt={userName}
      width={100}
      height={100}
      className="rounded-full object-cover w-[30px] h-[30px] border-[0.5px] border-tp-gray-100"
    />
  </div>
);
