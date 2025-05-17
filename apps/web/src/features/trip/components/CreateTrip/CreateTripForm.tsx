'use client';

import React, { FC } from 'react';
import { TAutocompleteProps, TFormValuesProps } from './CreateTripFormContainer';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputField } from './InputField';
import { Autocomplete } from '@react-google-maps/api';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { TextareaField } from './TextareaField';

type TCreateTripFormProps = {
  onSubmit: () => void;
  useForm: UseFormReturn<TFormValuesProps>;
  setDirectionsValue: (value: TDirectionsValueProps) => void;
  handlePlaceSelect: (autocompleteInstance: TAutocompleteProps, fieldName: 'origin' | 'destination') => void;
  originAutocomplete: TAutocompleteProps;
  destinationAutocomplete: TAutocompleteProps;
  setOriginAutocomplete: (value: TAutocompleteProps) => void;
  setDestinationAutocomplete: (value: TAutocompleteProps) => void;
  handleClearDirections: () => void;
  isEditing?: boolean;
};

export const CreateTripForm: FC<TCreateTripFormProps> = ({
  onSubmit,
  useForm,
  handlePlaceSelect,
  setDestinationAutocomplete,
  setOriginAutocomplete,
  originAutocomplete,
  destinationAutocomplete,
  handleClearDirections,
  isEditing = false,
}) => (
  <Form {...useForm}>
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        <InputField
          control={useForm.control}
          hasError={!!useForm.formState.errors.title}
          name="title"
          label="Title"
          placeholder="Trip Title"
        />
        <TextareaField control={useForm.control} name="description" label="Description" placeholder="Description" />
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <Autocomplete
          onLoad={(autocomplete) => setOriginAutocomplete(autocomplete)}
          onPlaceChanged={() => handlePlaceSelect(originAutocomplete, 'origin')}
        >
          <InputField
            control={useForm.control}
            hasError={!!useForm.formState.errors.origin}
            name="origin"
            label="Origin"
            placeholder="Start Route"
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => setDestinationAutocomplete(autocomplete)}
          onPlaceChanged={() => handlePlaceSelect(destinationAutocomplete, 'destination')}
        >
          <InputField
            control={useForm.control}
            hasError={!!useForm.formState.errors.destination}
            name="destination"
            label="Destination"
            placeholder="End Route"
          />
        </Autocomplete>
      </div>
      <div className="mt-10 flex gap-2 items-center">
        <Button type="submit">{isEditing ? 'Save' : 'Create Trip'}</Button>
        <Button variant="secondary" type="reset" className="text-gray-500 !px-2" onClick={handleClearDirections}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
            />
          </svg>
        </Button>
      </div>
    </form>
  </Form>
);
