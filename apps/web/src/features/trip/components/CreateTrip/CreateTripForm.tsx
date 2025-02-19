'use client';

import React, { FC } from 'react';
import { TFormValuesProps } from './CreateTripFormContainer';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputField } from './InputField';

type TCreateTripFormProps = {
  onSubmit: () => void;
  useForm: UseFormReturn<TFormValuesProps>;
};

export const CreateTripForm: FC<TCreateTripFormProps> = ({ onSubmit, useForm }) => (
  <Form {...useForm}>
    <form onSubmit={onSubmit}>
      <InputField control={useForm.control} name="title" label="Title" placeholder="Trip Title" />
      <div className="mt-10">
        <InputField control={useForm.control} name="drirections.origin" label="From" placeholder="Start Route" />
        <InputField control={useForm.control} name="drirections.destination" label="To" placeholder="End Route" />
      </div>
      {/* <Button variant="destructive" type="reset" onClick={() => useForm.reset()}>
        Reset
      </Button> */}
      <Button type="submit">Create Trip</Button>
    </form>
  </Form>
);
