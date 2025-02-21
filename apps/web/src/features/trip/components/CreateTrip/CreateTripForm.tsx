'use client';

import React, { FC } from 'react';
import { TFormValuesProps } from './CreateTripFormContainer';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputField } from './InputField';
import { Autocomplete } from '@react-google-maps/api';

type TCreateTripFormProps = {
  onSubmit: () => void;
  useForm: UseFormReturn<TFormValuesProps>;
};

export const CreateTripForm: FC<TCreateTripFormProps> = ({ onSubmit, useForm }) => (
  <Form {...useForm}>
    <form onSubmit={onSubmit}>
      <InputField control={useForm.control} name="title" label="Title" placeholder="Trip Title" />
      <div className="mt-10">
        <Autocomplete>
          <InputField control={useForm.control} name="directions.origin" label="From" placeholder="Start Route" />
        </Autocomplete>
        <Autocomplete>
          <InputField control={useForm.control} name="directions.destination" label="To" placeholder="End Route" />
        </Autocomplete>
      </div>
      {/* <Button variant="destructive" type="reset" onClick={() => useForm.reset()}>
        Reset
      </Button> */}
      <Button type="submit">Create Trip</Button>
    </form>
  </Form>
);
