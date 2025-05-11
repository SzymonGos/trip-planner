import React, { FC } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { TInputFieldProps } from './InputField';

type TTextareaFieldProps = TInputFieldProps;

export const TextareaField: FC<TTextareaFieldProps> = ({ control, label, name, placeholder }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea placeholder={placeholder} {...field} maxLength={350} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
