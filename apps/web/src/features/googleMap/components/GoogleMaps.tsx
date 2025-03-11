'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { TLocationCoordsProps, useUserGeolocation } from '@/hooks/useGeolocation';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { useGoogleMapLoader } from '../hooks/useGoogleMapLoader';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter: TLocationCoordsProps = {
  lat: 53,
  lng: 9,
};

export const GoogleMaps = () => {
  const { directionsValue, setDirectionsValue } = useGoogleMapsDirections();
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  const { isLoaded } = useGoogleMapLoader();
  const { location } = useUserGeolocation();

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const geocoder = new google.maps.Geocoder();

      try {
        geocoder.geocode({ location: e.latLng }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            const address = results[0].formatted_address;
            setDirectionsValue((prev: TDirectionsValueProps) => {
              if (!prev.origin) {
                return { ...prev, origin: address };
              } else if (!prev.destination) {
                return { ...prev, destination: address };
              } else {
                return { origin: address, destination: '' };
              }
            });
          }
        });
      } catch (error) {
        console.error('Error geocoding:', error);
      }
    },
    [setDirectionsValue],
  );

  const center = useMemo(() => (location?.lat && location?.lng ? location : defaultCenter), [location]);

  const directionsServiceOptions = useMemo<google.maps.DirectionsRequest>(
    () => ({
      destination: directionsValue.destination,
      origin: directionsValue.origin,
      travelMode: 'DRIVING' as google.maps.TravelMode,
    }),
    [directionsValue.origin, directionsValue.destination],
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

  const onDirectionsLoad = useCallback((directionsRenderer: google.maps.DirectionsRenderer) => {
    directionsRendererRef.current = directionsRenderer;
  }, []);

  const handleDirectionsChanged = useCallback(() => {
    if (!directionsRendererRef.current) return;
    const directions = directionsRendererRef.current.getDirections();

    if (directions && directions.routes.length > 0 && directions.routes[0].legs.length > 0) {
      const leg = directions.routes[0].legs[0];
      setDirectionsValue((prev: TDirectionsValueProps) => ({
        ...prev,
        origin: leg.start_address,
        destination: leg.end_address,
      }));
    }
  }, [setDirectionsValue]);

  const directionsResult = useMemo(
    () => ({
      directions: response,
    }),
    [response],
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={10} mapContainerStyle={mapContainerStyle} center={center} onClick={onMapClick}>
      {directionsValue.origin !== '' && directionsValue.destination !== '' && (
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
              clickable: false,
            },
            draggable: true,
          }}
          onLoad={onDirectionsLoad}
          onDirectionsChanged={handleDirectionsChanged}
        />
      )}
    </GoogleMap>
  );
};
