'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { TLocationCoordsProps, useUserGeolocation } from '@/hooks/useGeolocation';

type TDirectionsFormValueProps = {
  origin: google.maps.LatLngLiteral | string;
  destination: google.maps.LatLngLiteral | string;
  travelMode: google.maps.TravelMode;
  waypoints?: google.maps.DirectionsWaypoint[];
};

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter: TLocationCoordsProps = {
  lat: 53,
  lng: 9,
};

export const GoogleMaps = () => {
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [directionsFormValue, setDirectionsFormValue] = useState<TDirectionsFormValueProps>({
    origin: '',
    destination: '',
    waypoints: [],
    travelMode: 'DRIVING' as google.maps.TravelMode,
  });

  const { location } = useUserGeolocation();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      console.log('Map clicked', e.latLng.lat(), e.latLng.lng());

      if (directionsFormValue?.origin === '') {
        setDirectionsFormValue((prev) => ({
          ...prev,
          origin: `${e.latLng.lat()}, ${e.latLng.lng()}`,
        }));
      } else if (directionsFormValue?.destination === '') {
        setDirectionsFormValue((prev) => ({
          ...prev,
          destination: `${e.latLng.lat()}, ${e.latLng.lng()}`,
        }));
      }
      return;
    },
    [directionsFormValue],
  );

  const center = useMemo(() => (location?.lat && location?.lng ? location : defaultCenter), [location]);

  const directionsServiceOptions = useMemo<google.maps.DirectionsRequest>(
    () => ({
      destination: directionsFormValue.destination,
      origin: directionsFormValue.origin,
      travelMode: directionsFormValue.travelMode,
    }),
    [directionsFormValue.origin, directionsFormValue.destination, directionsFormValue.travelMode],
  );

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === 'OK' && result !== null) {
        setResponse(result);
      } else {
        console.error('Directions request failed:', status);
      }
    },
    [],
  );

  const directionsResult = useMemo(
    () => ({
      directions: response,
    }),
    [response],
  );

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <GoogleMap zoom={12} mapContainerStyle={mapContainerStyle} center={center} onClick={onMapClick}>
      {directionsFormValue.origin !== '' && directionsFormValue.destination !== '' && (
        <DirectionsService options={directionsServiceOptions} callback={directionsCallback} />
      )}

      {directionsResult.directions && <DirectionsRenderer directions={directionsResult.directions} />}
    </GoogleMap>
  );
};
