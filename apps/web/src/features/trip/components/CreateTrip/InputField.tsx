import React, { FC } from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormValues } from './CreateTripFormContainer';

type TInputFieldProps = {
  control: Control<FormValues>;
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: FC<TInputFieldProps> = ({ control, name, label, placeholder }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      </FormItem>
    )}
  />
);
