'use client';

import React, { FC, useState } from 'react';
import { TFormValuesProps } from './CreateTripFormContainer';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputField } from './InputField';
import { Autocomplete } from '@react-google-maps/api';
import { TDirectionsFormValueProps } from '@/lib/contexts/constants';

type TCreateTripFormProps = {
  onSubmit: () => void;
  useForm: UseFormReturn<TFormValuesProps>;
  setDirectionsFormValue: (value: TFormValuesProps) => void;
};

export const CreateTripForm: FC<TCreateTripFormProps> = ({ onSubmit, useForm, setDirectionsFormValue }) => {
  const [originAutocomplete, setOriginAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handlePlaceSelect = (
    autocompleteInstance: google.maps.places.Autocomplete | null,
    fieldName: TDirectionsFormValueProps,
  ) => {
    const place = autocompleteInstance.getPlace();
    if (!place) return;
    if (place && place.formatted_address) {
      useForm.setValue(fieldName, place.formatted_address);
      setDirectionsFormValue((prev: TDirectionsFormValueProps) => ({
        ...prev,
        [fieldName]: place.formatted_address,
      }));
    }
  };

  return (
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
};
