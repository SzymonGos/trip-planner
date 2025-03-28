'use client';

import { createContext, useContext, useMemo, useRef, useState, useCallback } from 'react';
import { initialDirections, TDirectionsValueProps } from './constants';

type TDirectionsContextProps = {
  directionsValue: TDirectionsValueProps;
  setDirectionsValue: (value: TDirectionsValueProps) => void;
  handleClearDirections: () => void;
  directionsResult: google.maps.DirectionsResult | null;
  setDirectionsResult: (result: google.maps.DirectionsResult | null) => void;
  directionsRendererRef: React.RefObject<google.maps.DirectionsRenderer | null>;
};

const DirectionsContext = createContext<TDirectionsContextProps>({} as TDirectionsContextProps);

export const DirectionsProvider = ({ children }) => {
  const [directionsValue, setDirectionsValue] = useState<TDirectionsValueProps>(initialDirections);
  const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  const handleClearDirections = useCallback(() => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
    setDirectionsValue(initialDirections);
    setDirectionsResult(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      directionsValue,
      setDirectionsValue,
      handleClearDirections,
      directionsResult,
      setDirectionsResult,
      directionsRendererRef,
    }),
    [directionsValue, directionsResult, handleClearDirections],
  );

  return <DirectionsContext.Provider value={contextValue}>{children}</DirectionsContext.Provider>;
};

export const useGoogleMapsDirections = () => useContext(DirectionsContext);
