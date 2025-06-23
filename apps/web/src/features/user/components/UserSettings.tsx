'use client';

import React from 'react';
import { User } from 'tp-graphql-types';
import { Form } from '@/components/ui/form';
import { InputField } from '@/features/trip/components/CreateTrip/InputField';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { userSettingsSchema } from '../helpers/formValidation';
import { ProfileImageUpload } from './ProfileImageUpload';

type TFormValuesProps = z.infer<typeof userSettingsSchema>;

type UserSettingsProps = {
  user?: User;
  useFormReturn: UseFormReturn<TFormValuesProps>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

export const UserSettings = ({ user, useFormReturn, onSubmit }: UserSettingsProps) => (
  <Form {...useFormReturn}>
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center gap-6 mb-8">
        <ProfileImageUpload
          defaultValue={user?.profileImage?.id}
          onFileChange={(file) => {
            useFormReturn.setValue('profileImage', file);
          }}
        />
      </div>
      <InputField<TFormValuesProps>
        control={useFormReturn.control}
        name="username"
        label="Username"
        placeholder="Enter your username"
        hasError={!!useFormReturn.formState.errors.username}
      />
      <InputField<TFormValuesProps>
        control={useFormReturn.control}
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        hasError={!!useFormReturn.formState.errors.email}
      />
      <div className="flex gap-4">
        <Button type="submit">Save Changes</Button>
        <Button variant="outline" type="button" onClick={() => useFormReturn.reset()}>
          Cancel
        </Button>
      </div>
    </form>
  </Form>
);
