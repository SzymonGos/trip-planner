'use client';

import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import React, { useEffect } from 'react';
import { UserSettings } from './UserSettings';
import { useQuery, useMutation } from '@apollo/client';
import { getUserDataQuery } from '../server/db/getUserDataQuery';
import { updateUserMutationQuery } from '../server/actions/updateUserMutationQuery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSettingsSchema } from '../helpers/formValidation';
import { z } from 'zod';
import { CloudinaryImage_File, UserUpdateArgs } from 'tp-graphql-types';

type TFormValuesProps = z.infer<typeof userSettingsSchema> & {
  profileImage?: CloudinaryImage_File | File;
};

export const UserSettingsContainer = () => {
  const { authUserId } = useAuthenticatedUser();

  const { data } = useQuery(getUserDataQuery, {
    variables: {
      id: authUserId,
    },
  });

  const [updateUserMutation] = useMutation(updateUserMutationQuery);

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  useEffect(() => {
    if (data?.user) {
      useFormReturn.reset({
        username: data.user.username || '',
        email: data.user.email || '',
      });
    }
  }, [data?.user, useFormReturn]);

  const handleOnSubmit = async (data: UserUpdateArgs['data']) => {
    try {
      let profileImage = data.profileImage;
      if (profileImage && !(profileImage instanceof File)) {
        profileImage = undefined;
      }

      await updateUserMutation({
        variables: {
          where: { id: authUserId },
          data: {
            ...data,
            profileImage,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  return <UserSettings user={data?.user} useFormReturn={useFormReturn} onSubmit={handleSubmitCallback} />;
};
