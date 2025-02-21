'use client';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { TDirectionsFormValueProps } from '@/lib/contexts/constants';

export type TFormValuesProps = {
  title: string;
  directions: TDirectionsFormValueProps;
};

export const CreateTripFormContainer = () => {
  const { directionsFormValue } = useGoogleMapsDirections();
  const useFormReturn = useForm<TFormValuesProps>({
    defaultValues: {
      title: '',
      directions: directionsFormValue,
    },
  });

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = (data) => {
    console.log('form data', data);
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('directions', directionsFormValue);
  }, [directionsFormValue, useFormReturn]);

  return <CreateTripForm onSubmit={handleSubmitCallback} useForm={useFormReturn} />;
};
