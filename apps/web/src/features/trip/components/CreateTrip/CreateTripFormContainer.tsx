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
import { getTripsQuery } from '../../server/db/getTripsQuery';

export type TFormValuesProps = {
  title: string;
  origin: TDirectionsValueProps['origin'];
  destination: TDirectionsValueProps['destination'];
} & z.infer<typeof tripSchema>;

export type TAutocompleteProps = google.maps.places.Autocomplete | null;

export const CreateTripFormContainer = () => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections } = useGoogleMapsDirections();
  const { isLoaded } = useGoogleMapLoader();
  const { authUserId } = useAuthenticatedUser();

  const [createTripMutation] = useMutation(createTripMutationQuery);

  const defaultValues = {
    title: '',
    origin: directionsValue?.origin || '',
    destination: directionsValue?.destination || '',
  };
  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(tripSchema),
    defaultValues,
  });

  const handlePlaceSelect = (autocompleteInstance: TAutocompleteProps, fieldName: TDirectionsValueProps) => {
    const place = autocompleteInstance?.getPlace();
    if (!place) return;
    if (place && place.formatted_address) {
      useFormReturn.setValue(fieldName, place.formatted_address);
      setDirectionsValue((prev: TDirectionsValueProps) => ({
        ...prev,
        [fieldName]: place.formatted_address,
      }));
    }
  };

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = (data) => {
    createTripMutation({
      variables: {
        data: {
          title: data.title,
          origin: data.origin,
          destination: data.destination,
          creator: {
            connect: {
              id: authUserId,
            },
          },
        },
      },
      refetchQueries: [{ query: getTripsQuery }],
    });
    useFormReturn.reset();
    handleClearDirections();
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue?.origin as string);
    useFormReturn.setValue('destination', directionsValue?.destination as string);
  }, [directionsValue, useFormReturn]);

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
      handleClearDirections={handleClearDirections}
    />
  );
};
