'use client';

import React, { useState, useCallback, ReactNode, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TripFormContext, TripFormContextTypeProps } from './TripFormContext';
import { TTripImageFormValue, TFormValuesProps } from '../components/CreateTrip/CreateTripFormContainer';

type TTripFormProviderProps = {
  children: ReactNode;
  useForm: UseFormReturn<TFormValuesProps>;
  isEditing?: boolean;
  onSubmit: () => void;
  onReset: () => void;
  isSubmitting?: boolean;
};

export const TripFormProvider: React.FC<TTripFormProviderProps> = ({
  children,
  useForm,
  isEditing = false,
  onSubmit,
  onReset,
  isSubmitting = false,
}) => {
  const [newImages, setNewImages] = useState<File[]>([]);

  const currentImages = useForm.watch('images') || [];
  const formStatus = useForm.watch('status') as 'planning' | 'completed';

  const existingImages = currentImages.filter((img): img is TTripImageFormValue => !(img instanceof File));

  const handleExistingImagesRemove = useCallback(
    (imageId: string) => {
      const updatedImages = currentImages.filter((img) => {
        if (img instanceof File) return true;
        return img.id !== imageId;
      });
      useForm.setValue('images', updatedImages);
    },
    [currentImages, useForm],
  );

  const handleNewImagesChange = useCallback(
    (files: File[]) => {
      setNewImages(files);
      const updatedImages = [...existingImages, ...files];
      useForm.setValue('images', updatedImages);
    },
    [existingImages, useForm],
  );

  const contextValue: TripFormContextTypeProps = useMemo(
    () => ({
      isEditing,
      existingImages,
      newImages,
      handleExistingImagesRemove,
      handleNewImagesChange,
      maxTotalImages: 5,
      formStatus,
      isSubmitting,
      handleSubmit: onSubmit,
      handleReset: onReset,
    }),
    [
      isEditing,
      existingImages,
      newImages,
      handleExistingImagesRemove,
      handleNewImagesChange,
      formStatus,
      isSubmitting,
      onSubmit,
      onReset,
    ],
  );

  return <TripFormContext.Provider value={contextValue}>{children}</TripFormContext.Provider>;
};
