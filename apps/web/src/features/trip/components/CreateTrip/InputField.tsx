import React, { FC } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { TFormValuesProps } from './CreateTripFormContainer';

export type TInputFieldProps = {
  control: Control<TFormValuesProps>;
  name: string;
  label: string;
  placeholder: string;
  hasError: boolean;
};

export const InputField: FC<TInputFieldProps> = ({ control, name, label, placeholder, hasError }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-base">{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            className="py-6 md:text-base focus-visible:ring-0 border-tp-gray-100 focus:border focus:border-tp-gray-200 shadow-none"
            hasError={hasError}
          />
        </FormControl>
        <FormMessage className="text-base" />
      </FormItem>
    )}
  />
);
