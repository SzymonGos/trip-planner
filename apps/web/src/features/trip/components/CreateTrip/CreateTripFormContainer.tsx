'use client';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { TDirectionsFormValueProps } from '@/lib/contexts/constants';

export type TFormValuesProps = {
  title: string;
  origin: TDirectionsFormValueProps['origin'];
  destination: TDirectionsFormValueProps['destination'];
  directions: TDirectionsFormValueProps;
};

export const CreateTripFormContainer = () => {
  const { directionsFormValue, setDirectionsFormValue } = useGoogleMapsDirections();
  const defaultValues = {
    title: '',
    origin: directionsFormValue.origin,
    destination: directionsFormValue.destination,
  };
  const useFormReturn = useForm<TFormValuesProps>({
    defaultValues,
  });

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = (data) => {
    console.log('form data', data);
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', directionsFormValue.origin);
    useFormReturn.setValue('destination', directionsFormValue.destination);
  }, [directionsFormValue, useFormReturn]);

  return (
    <CreateTripForm
      onSubmit={handleSubmitCallback}
      useForm={useFormReturn}
      setDirectionsFormValue={setDirectionsFormValue}
    />
  );
};
