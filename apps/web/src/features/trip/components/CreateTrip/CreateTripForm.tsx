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
import { SelectField } from './SelectField';
import { ResetIcon } from '@/components/Icons/ResetIcon';
import { TripImagesUpload } from './TripImagesUpload';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TTripImageFormValue } from './CreateTripFormContainer';

type TCreateTripFormProps = {
  onSubmit: () => void;
  useForm: UseFormReturn<TFormValuesProps>;
  setDirectionsValue: (value: TDirectionsValueProps) => void;
  handlePlaceSelect: (autocompleteInstance: TAutocompleteProps, fieldName: 'origin' | 'destination') => void;
  originAutocomplete: TAutocompleteProps;
  destinationAutocomplete: TAutocompleteProps;
  setOriginAutocomplete: (value: TAutocompleteProps) => void;
  setDestinationAutocomplete: (value: TAutocompleteProps) => void;
  handleClearForm: () => void;
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
  handleClearForm,
  isEditing = false,
}) => {
  const status = useForm.watch('status');

  return (
    <Form {...useForm}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <InputField
            control={useForm.control}
            hasError={!!useForm.formState.errors.title}
            name="title"
            label="Title"
            placeholder="Trip Title"
          />
          <TextareaField control={useForm.control} name="description" label="Description" placeholder="Description" />
        </div>
        <div className="mt-10 flex flex-col gap-6">
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
          <SelectField
            control={useForm.control}
            name="status"
            label="Status"
            placeholder="Select status"
            options={[
              { label: 'Planning', value: 'planning' },
              { label: 'Completed', value: 'completed' },
            ]}
          />
          <div className="mt-2 w-fit">
            {status !== 'completed' ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <TripImagesUpload
                      disabled
                      defaultImages={
                        useForm.watch('images')?.filter((img): img is TTripImageFormValue => !(img instanceof File)) ||
                        []
                      }
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Change status to <b>Completed</b> to add images
                </TooltipContent>
              </Tooltip>
            ) : (
              <TripImagesUpload
                onFilesChange={(images) => useForm.setValue('images', images)}
                defaultImages={
                  useForm.watch('images')?.filter((img): img is TTripImageFormValue => !(img instanceof File)) || []
                }
              />
            )}
          </div>
        </div>
        <div className="mt-10 flex gap-2 items-center">
          <Button type="submit">{isEditing ? 'Save' : 'Create Trip'}</Button>
          <Button variant="secondary" type="reset" className="text-gray-500 !px-2" onClick={handleClearForm}>
            <ResetIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
