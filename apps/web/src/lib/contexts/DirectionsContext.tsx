'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { TDirectionsValueProps } from './constants';

type TDirectionsContextProps = {
  directionsValue: TDirectionsValueProps;
  setDirectionsValue: (value: TDirectionsValueProps) => void;
};

const DirectionsContext = createContext<TDirectionsContextProps>({} as TDirectionsContextProps);

export const DirectionsProvider = ({ children }) => {
  const [directionsValue, setDirectionsValue] = useState<TDirectionsValueProps>({
    origin: '',
    destination: '',
    waypoints: [],
  });

  const contextValue = useMemo(() => ({ directionsValue, setDirectionsValue }), [directionsValue]);

  return <DirectionsContext.Provider value={contextValue}>{children}</DirectionsContext.Provider>;
};

export const useGoogleMapsDirections = () => useContext(DirectionsContext);
