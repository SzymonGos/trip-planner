'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const GoogleMapsContext = createContext<object | undefined>(undefined);

export const GoogleMapsProvider = ({ children }) => {
  const [points, setPoints] = useState();

  const contextValue = useMemo(() => ({ points, setPoints }), [points]);

  return <GoogleMapsContext.Provider value={contextValue}>{children}</GoogleMapsContext.Provider>;
};

export const useGoogleMpas = () => useContext(GoogleMapsContext);
