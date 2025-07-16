'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { TTripImageFormValue } from '../components/CreateTrip/CreateTripFormContainer';

export type TripFormContextTypeProps = {
  isEditing: boolean;
  existingImages: TTripImageFormValue[];
  newImages: File[];
  handleExistingImagesRemove: (imageId: string) => void;
  handleNewImagesChange: (files: File[]) => void;
  maxTotalImages: number;
  formStatus: 'planning' | 'completed';
  isSubmitting: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
};

const defaultContextValue: TripFormContextTypeProps = {
  isEditing: false,
  existingImages: [],
  newImages: [],
  handleExistingImagesRemove: () => {},
  handleNewImagesChange: () => {},
  maxTotalImages: 5,
  formStatus: 'planning',
  isSubmitting: false,
  handleSubmit: () => {},
  handleReset: () => {},
};

export const TripFormContext = createContext<TripFormContextTypeProps>(defaultContextValue);

export type TripFormProviderProps = {
  children: ReactNode;
  value: TripFormContextTypeProps;
};

export const TripFormProvider: React.FC<TripFormProviderProps> = ({ children, value }) => (
  <TripFormContext.Provider value={value}>{children}</TripFormContext.Provider>
);

export const useTripFormContext = () => useContext(TripFormContext);
