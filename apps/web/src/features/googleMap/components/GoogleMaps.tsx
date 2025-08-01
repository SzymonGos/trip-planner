'use client';

import React, { FC, useCallback, useMemo } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { TLocationCoordsProps, useUserGeolocation } from '@/hooks/useGeolocation';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { useGoogleMapLoader } from '../hooks/useGoogleMapLoader';
import { customMapStyle } from '../hooks/mapStyles';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const defaultCenter: TLocationCoordsProps = {
  lat: 53,
  lng: 9,
};

type TGoogleMapsProps = {
  canEdit?: boolean;
};

export const GoogleMaps: FC<TGoogleMapsProps> = ({ canEdit = true }) => {
  const {
    directionsValue,
    setDirectionsValue,
    directionsResult,
    setDirectionsResult,
    directionsRendererRef,
    getDistance,
  } = useGoogleMapsDirections();
  const { isLoaded } = useGoogleMapLoader();
  const { location } = useUserGeolocation();

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!canEdit || !e.latLng) return;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const address = results[0].formatted_address;
          if (!directionsValue.origin) {
            setDirectionsValue({ ...directionsValue, origin: address });
          } else if (!directionsValue.destination) {
            setDirectionsValue({ ...directionsValue, destination: address });
          } else {
            setDirectionsValue({ origin: address, destination: '', waypoints: [] });
          }
        }
      });
    },
    [directionsValue, setDirectionsValue, canEdit],
  );

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === 'OK' && result !== null) {
        setDirectionsResult(result);

        if (directionsValue.origin && directionsValue.destination) {
          const originStr =
            typeof directionsValue.origin === 'string'
              ? directionsValue.origin
              : JSON.stringify(directionsValue.origin);

          const destinationStr =
            typeof directionsValue.destination === 'string'
              ? directionsValue.destination
              : JSON.stringify(directionsValue.destination);

          getDistance(originStr, destinationStr);
        }
      } else {
        console.error('Directions request failed:', status);
      }
    },
    [setDirectionsResult, directionsValue, getDistance],
  );

  const onDirectionsLoad = useCallback(
    (directionsRenderer: google.maps.DirectionsRenderer) => {
      directionsRendererRef.current = directionsRenderer;
    },
    [directionsRendererRef],
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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      mapContainerStyle={mapContainerStyle}
      center={center}
      onClick={onMapClick}
      options={{
        styles: customMapStyle,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }}
    >
      {directionsValue.origin && directionsValue.destination && (
        <DirectionsService options={directionsServiceOptions} callback={directionsCallback} />
      )}
      {directionsResult && (
        <DirectionsRenderer
          directions={directionsResult}
          options={{
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#3B82F6',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            },
            draggable: canEdit,
          }}
          onLoad={onDirectionsLoad}
        />
      )}
    </GoogleMap>
  );
};
