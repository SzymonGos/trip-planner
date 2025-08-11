import { FC } from 'react';

type TripDistanceInfoProps = {
  distance: string;
  duration: string;
};

export const TripDistanceInfo: FC<TripDistanceInfoProps> = ({ distance, duration }) => (
  <div className="absolute z-40 p-4 flex top-[86px] w-full bg-tp-white-100 border-b border-tp-gray-100">
    <div className="flex flex-col md:flex-row basis-1/2 gap-2">
      Distance:
      <div className="font-semibold">{distance}</div>
    </div>
    <div className="flex flex-col md:flex-row basis-1/2 gap-2">
      Estimated Duration: <div className="font-semibold">{duration}</div>
    </div>
  </div>
);
