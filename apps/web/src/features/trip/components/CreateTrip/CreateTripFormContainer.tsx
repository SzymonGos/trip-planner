'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';

export type FormValues = {
  title: string;
  startRoute: string;
  endRoute: string;
};

export const CreateTripFormContainer = () => {
  const defaultValues = {
    title: '',
    startRoute: '',
    endRoute: '',
  };

  const useFormReturn = useForm<FormValues>({
    defaultValues,
  });

  const handleOnSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('form data', data);
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  return <CreateTripForm onSubmit={handleSubmitCallback} useForm={useFormReturn} />;
};
