'use client';

import React, { FC } from 'react';
import { TAutocompleteProps, TFormValuesProps } from './CreateTripFormContainer';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputField } from './InputField';
import { Autocomplete } from '@react-google-maps/api';
import { TDirectionsValueProps } from '@/lib/contexts/constants';

type TCreateTripFormProps = {
  onSubmit: () => void;
  useForm: UseFormReturn<TFormValuesProps>;
  setDirectionsValue: (value: TFormValuesProps) => void;
  handlePlaceSelect: (autocompleteInstance: TAutocompleteProps, fieldName: TDirectionsValueProps) => void;
  originAutocomplete: TAutocompleteProps;
  destinationAutocomplete: TAutocompleteProps;
  setOriginAutocomplete: (value: TAutocompleteProps) => void;
  setDestinationAutocomplete: (value: TAutocompleteProps) => void;
};

export const CreateTripForm: FC<TCreateTripFormProps> = ({
  onSubmit,
  useForm,
  handlePlaceSelect,
  setDestinationAutocomplete,
  setOriginAutocomplete,
  originAutocomplete,
  destinationAutocomplete,
}) => (
  <Form {...useForm}>
    <form onSubmit={onSubmit}>
      <InputField control={useForm.control} name="title" label="Title" placeholder="Trip Title" />
      <div className="mt-10">
        <Autocomplete
          onLoad={(autocomplete) => setOriginAutocomplete(autocomplete)}
          onPlaceChanged={() => handlePlaceSelect(originAutocomplete, 'origin')}
        >
          <InputField control={useForm.control} name="origin" label="From" placeholder="Start Route" />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => setDestinationAutocomplete(autocomplete)}
          onPlaceChanged={() => handlePlaceSelect(destinationAutocomplete, 'destination')}
        >
          <InputField control={useForm.control} name="destination" label="To" placeholder="End Route" />
        </Autocomplete>
      </div>
      {/* <Button variant="destructive" type="reset" onClick={() => useForm.reset()}>
        Reset
      </Button> */}
      <Button type="submit">Create Trip</Button>
    </form>
  </Form>
);
