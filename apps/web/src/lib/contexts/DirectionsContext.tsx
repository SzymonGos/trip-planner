'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { TDirectionsFormValueProps } from './constants';

type TDirectionsContextProps = {
  directionsFormValue: TDirectionsFormValueProps;
  setDirectionsFormValue: (value: TDirectionsFormValueProps) => void;
};

const DirectionsContext = createContext<TDirectionsContextProps>({} as TDirectionsContextProps);

export const DirectionsProvider = ({ children }) => {
  const [directionsFormValue, setDirectionsFormValue] = useState<TDirectionsFormValueProps>({
    origin: '',
    destination: '',
    waypoints: [],
  });

  const contextValue = useMemo(() => ({ directionsFormValue, setDirectionsFormValue }), [directionsFormValue]);

  return <DirectionsContext.Provider value={contextValue}>{children}</DirectionsContext.Provider>;
};

export const useGoogleMapsDirections = () => useContext(DirectionsContext);
