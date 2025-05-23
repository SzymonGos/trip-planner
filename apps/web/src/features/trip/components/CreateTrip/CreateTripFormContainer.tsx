'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { useMutation } from '@apollo/client';
import { createTripMutationQuery } from '../../server/actions/createTripMutationQuery';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema } from '../../helpers/formValidation';
import { useRouter } from 'next/navigation';
import { getTripUrl } from '../../helpers/getTripUrl';
import { getUserTripsQuery } from '@/features/user/server/db/getUserTripsQuery';
import { getTripsQuery } from '../../server/db/getTripsQuery';

export type TFormValuesProps = {
  title: string;
  description?: string;
  origin: string;
  destination: string;
} & z.infer<typeof tripSchema>;

export type TAutocompleteProps = google.maps.places.Autocomplete | null;

export const CreateTripFormContainer = () => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections, distanceInfo, getDistance } =
    useGoogleMapsDirections();
  const { isLoaded } = useGoogleMapLoader();
  const { authUserId } = useAuthenticatedUser();
  const router = useRouter();

  const [createTripMutation] = useMutation(createTripMutationQuery);

  const defaultValues = {
    title: '',
    description: '',
    origin: directionsValue.origin || '',
    destination: directionsValue.destination || '',
  };

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(tripSchema),
    defaultValues,
  });

  const handlePlaceSelect = (autocompleteInstance: TAutocompleteProps, fieldName: 'origin' | 'destination') => {
    const place = autocompleteInstance?.getPlace();
    if (!place) return;
    if (place && place.formatted_address) {
      useFormReturn.setValue(fieldName, place.formatted_address);

      const newDirectionsValue: TDirectionsValueProps = {
        ...directionsValue,
        [fieldName]: place.formatted_address,
      };

      setDirectionsValue(newDirectionsValue);
    }
  };

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = async (data) => {
    try {
      const createTripResponse = await createTripMutation({
        variables: {
          data: {
            title: data.title,
            description: data.description,
            origin: data.origin,
            destination: data.destination,
            creator: {
              connect: {
                id: authUserId,
              },
            },
            distance: distanceInfo.distance,
            estimatedDuration: distanceInfo.duration,
          },
        },
        refetchQueries: [{ query: getTripsQuery }, { query: getUserTripsQuery }],
      });

      const tripId = createTripResponse?.data?.createTrip?.id;
      useFormReturn.reset();
      handleClearDirections();
      router?.push(getTripUrl(tripId));
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleClearForm = () => {
    useFormReturn.reset();
    handleClearDirections();
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue?.origin);
    useFormReturn.setValue('destination', directionsValue.destination);
  }, [directionsValue, useFormReturn]);

  useEffect(() => {
    const fetchDistance = async () => {
      if (directionsValue.origin && directionsValue.destination) {
        const originStr = JSON.stringify(directionsValue.origin);

        const destinationStr = JSON.stringify(directionsValue.destination);

        getDistance(originStr, destinationStr).catch((error) => {
          console.error('Error fetching distance:', error);
        });
      }
    };

    fetchDistance();
  }, [directionsValue.origin, directionsValue.destination, getDistance]);

  if (!isLoaded) return <div>Form Loading...</div>;

  return (
    <div>
      <CreateTripForm
        onSubmit={handleSubmitCallback}
        useForm={useFormReturn}
        setDirectionsValue={setDirectionsValue}
        handlePlaceSelect={handlePlaceSelect}
        originAutocomplete={originAutocomplete}
        destinationAutocomplete={destinationAutocomplete}
        setOriginAutocomplete={setOriginAutocomplete}
        setDestinationAutocomplete={setDestinationAutocomplete}
        handleClearForm={handleClearForm}
      />

      {distanceInfo && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <div className="font-medium">Trip Information</div>
          <div>Distance: {distanceInfo.distance}</div>
          <div>Estimated Duration: {distanceInfo.duration}</div>
        </div>
      )}
    </div>
  );
};
