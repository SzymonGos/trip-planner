'use client';

import { IPAPI_URL } from '@/lib/config';
import { useEffect, useState } from 'react';

export type TLocationCoordsProps = {
  lat: number;
  lng: number;
};

export const useUserGeolocation = () => {
  const [location, setLocation] = useState<TLocationCoordsProps>({ lat: null, lng: null });

  const getUserLocation = async () => {
    try {
      const response = await fetch(IPAPI_URL);
      const data = await response.json();
      setLocation({ lat: data.latitude, lng: data.longitude });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { location };
};
