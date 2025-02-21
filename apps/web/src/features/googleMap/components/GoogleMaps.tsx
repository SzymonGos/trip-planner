'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { TLocationCoordsProps, useUserGeolocation } from '@/hooks/useGeolocation';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter: TLocationCoordsProps = {
  lat: 53,
  lng: 9,
};

export const GoogleMaps = () => {
  const { directionsFormValue, setDirectionsFormValue } = useGoogleMapsDirections();
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);

  const { location } = useUserGeolocation();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (directionsFormValue?.origin === '') {
        setDirectionsFormValue({
          ...directionsFormValue,
          origin: `${e.latLng.lat()}, ${e.latLng.lng()}`,
        });
      } else if (directionsFormValue?.destination === '') {
        setDirectionsFormValue({
          ...directionsFormValue,
          destination: `${e.latLng.lat()}, ${e.latLng.lng()}`,
        });
      }
      return;
    },
    [directionsFormValue, setDirectionsFormValue],
  );

  const center = useMemo(() => (location?.lat && location?.lng ? location : defaultCenter), [location]);

  const directionsServiceOptions = useMemo<google.maps.DirectionsRequest>(
    () => ({
      destination: directionsFormValue.destination,
      origin: directionsFormValue.origin,
      travelMode: 'DRIVING' as google.maps.TravelMode,
    }),
    [directionsFormValue.origin, directionsFormValue.destination],
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
    <GoogleMap zoom={10} mapContainerStyle={mapContainerStyle} center={center} onClick={onMapClick}>
      {directionsFormValue.origin !== '' && directionsFormValue.destination !== '' && (
        <DirectionsService options={directionsServiceOptions} callback={directionsCallback} />
      )}

      {directionsResult.directions && (
        <DirectionsRenderer
          directions={directionsResult.directions}
          options={{
            polylineOptions: {
              strokeColor: 'red',
              strokeOpacity: 0.5,
              strokeWeight: 6,
              clickable: true,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};
