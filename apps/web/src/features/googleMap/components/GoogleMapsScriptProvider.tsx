'use client';

import React from 'react';
import { Libraries as TLibraries, LoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';

const lib: TLibraries = ['places'];

export const GoogleMapsScriptProvider = ({ children }) => (
  <LoadScript libraries={lib} googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
    {children}
  </LoadScript>
);
