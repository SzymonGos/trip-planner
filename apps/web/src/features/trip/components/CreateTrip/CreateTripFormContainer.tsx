'use client';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { TDirectionsValueProps } from '@/lib/contexts/constants';

export type TFormValuesProps = {
  title: string;
  origin: TDirectionsValueProps['origin'];
  destination: TDirectionsValueProps['destination'];
};

export const CreateTripFormContainer = () => {
  const { directionsValue, setDirectionsValue } = useGoogleMapsDirections();
  const defaultValues = {
    title: '',
    origin: directionsValue.origin,
    destination: directionsValue.destination,
  };
  const useFormReturn = useForm<TFormValuesProps>({
    defaultValues,
  });

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = (data) => {
    console.log('form data', data);
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsValue.origin);
    useFormReturn.setValue('destination', directionsValue.destination);
  }, [directionsValue, useFormReturn]);

  return (
    <CreateTripForm onSubmit={handleSubmitCallback} useForm={useFormReturn} setDirectionsValue={setDirectionsValue} />
  );
};
