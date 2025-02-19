import React, { FC } from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { TFormValuesProps } from './CreateTripFormContainer';

type TInputFieldProps = {
  control: Control<TFormValuesProps>;
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
