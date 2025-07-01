'use client';

import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import React, { FC, useEffect, useState } from 'react';
import { CreateTripForm } from '../CreateTrip/CreateTripForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TAutocompleteProps, TFormValuesProps } from '../CreateTrip/CreateTripFormContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema } from '../../helpers/formValidation';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';
import { useMutation } from '@apollo/client';
import { updateTripMutationQuery } from '../../server/actions/updateTripMutationQuery';
import { Trip as TTrip } from 'tp-graphql-types';

type TEditTripFormContainerProps = {
  trip: TTrip;
};

export const EditTripFormContainer: FC<TEditTripFormContainerProps> = ({ trip }) => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections, distanceInfo, getDistance } =
    useGoogleMapsDirections();
  const { isLoaded } = useGoogleMapLoader();

  const [updateTripMutation] = useMutation(updateTripMutationQuery);

  const defaultValues = {
    title: trip.title,
    origin: trip.origin,
    destination: trip.destination,
    status: trip.status,
    description: trip.description || '',
    images: [],
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
      await updateTripMutation({
        variables: {
          where: { id: trip.id },
          data: {
            title: data.title,
            origin: data.origin,
            destination: data.destination,
            distance: distanceInfo.distance,
            estimatedDuration: distanceInfo.duration,
          },
        },
      });
      handleClearDirections();
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', typeof directionsValue?.origin === 'string' ? directionsValue.origin : '');
    useFormReturn.setValue(
      'destination',
      typeof directionsValue.destination === 'string' ? directionsValue.destination : '',
    );
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

  useEffect(() => {
    const currentStatus = useFormReturn.watch('status');
    const currentImages = useFormReturn.watch('images');

    if (currentStatus === 'planning' && currentImages && currentImages.length > 0) {
      useFormReturn.setValue('images', []);
    }
  }, [useFormReturn.watch('status')]);

  if (!isLoaded) return <div>Form Loading...</div>;

  return (
    <CreateTripForm
      onSubmit={handleSubmitCallback}
      useForm={useFormReturn}
      setDirectionsValue={setDirectionsValue}
      handlePlaceSelect={handlePlaceSelect}
      originAutocomplete={originAutocomplete}
      destinationAutocomplete={destinationAutocomplete}
      setOriginAutocomplete={setOriginAutocomplete}
      setDestinationAutocomplete={setDestinationAutocomplete}
      handleClearForm={handleClearDirections}
      isEditing={true}
    />
  );
};
