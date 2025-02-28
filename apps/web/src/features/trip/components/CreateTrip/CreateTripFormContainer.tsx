'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { useMutation } from '@apollo/client';
import { createTripMutationQuery } from '../../server/actions/createTripMutationQuery';

export type TFormValuesProps = {
  title: string;
  origin: TDirectionsValueProps['origin'];
  destination: TDirectionsValueProps['destination'];
};

export type TAutocompleteProps = google.maps.places.Autocomplete | null;

export const CreateTripFormContainer = () => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue } = useGoogleMapsDirections();

  const [createTripMutation] = useMutation(createTripMutationQuery);

  const defaultValues = {
    title: '',
    origin: directionsValue.origin,
    destination: directionsValue.destination,
  };
  const useFormReturn = useForm<TFormValuesProps>({
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
    console.log('form data', data);
    createTripMutation({
      variables: {
        data,
      },
    });
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue.origin);
    useFormReturn.setValue('destination', directionsValue.destination);
  }, [directionsValue, useFormReturn]);

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
    />
  );
};
