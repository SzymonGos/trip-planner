'use client';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMaps } from '@/lib/contexts/GoogleMapsContext';
import { TDirectionsFormValueProps } from '@/lib/contexts/constants';

export type TFormValuesProps = {
  title: string;
  drirections: TDirectionsFormValueProps;
};

export const CreateTripFormContainer = () => {
  const { directionsFormValue } = useGoogleMaps();
  const useFormReturn = useForm<TFormValuesProps>({
    defaultValues: {
      title: '',
      drirections: directionsFormValue,
    },
  });

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = (data) => {
    console.log('form data', data);
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('drirections', directionsFormValue);
  }, [directionsFormValue, useFormReturn]);

  return <CreateTripForm onSubmit={handleSubmitCallback} useForm={useFormReturn} />;
};
