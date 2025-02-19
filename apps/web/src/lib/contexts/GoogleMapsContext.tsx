'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { TDirectionsFormValueProps } from './constants';

type TGoogleMapsContextProps = {
  directionsFormValue: TDirectionsFormValueProps;
  setDirectionsFormValue: (value: TDirectionsFormValueProps) => void;
};

const GoogleMapsContext = createContext<TGoogleMapsContextProps>({} as TGoogleMapsContextProps);

export const GoogleMapsProvider = ({ children }) => {
  const [directionsFormValue, setDirectionsFormValue] = useState<TDirectionsFormValueProps>({
    origin: '',
    destination: '',
    waypoints: [],
  });

  const contextValue = useMemo(() => ({ directionsFormValue, setDirectionsFormValue }), [directionsFormValue]);

  return <GoogleMapsContext.Provider value={contextValue}>{children}</GoogleMapsContext.Provider>;
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
