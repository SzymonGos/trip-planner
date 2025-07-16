'use client';

import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import React, { FC, useEffect, useState } from 'react';
import { CreateTripForm } from '../CreateTrip/CreateTripForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TAutocompleteProps, TFormValuesProps } from '../CreateTrip/CreateTripFormContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema } from '../../helpers/formValidation';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';
import { useMutation } from '@apollo/client';
import { updateTripMutationQuery } from '../../server/actions/updateTripMutationQuery';
import { Trip as TTrip } from 'tp-graphql-types';
import { TripFormProvider } from '../../contexts/TripFormProvider';

type TEditTripFormContainerProps = {
  trip: TTrip;
};

export const EditTripFormContainer: FC<TEditTripFormContainerProps> = ({ trip }) => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections, distanceInfo, getDistance } =
    useGoogleMapsDirections();
  const { isLoaded } = useGoogleMapLoader();

  const [updateTripMutation] = useMutation(updateTripMutationQuery);

  const defaultValues = {
    title: trip.title,
    origin: trip.origin,
    destination: trip.destination,
    status: trip.status,
    description: trip.description || '',
    images:
      trip.tripImages?.map((tripImage) => ({
        id: tripImage.image?.id || '',
        publicUrl: tripImage.image?.publicUrl || '',
        publicUrlTransformed: tripImage.image?.publicUrlTransformed || '',
      })) || [],
  };

  const useFormReturn = useForm<TFormValuesProps>({
    resolver: zodResolver(tripSchema),
    defaultValues,
  });

  const handlePlaceSelect = (autocompleteInstance: TAutocompleteProps, fieldName: 'origin' | 'destination') => {
    const place = autocompleteInstance?.getPlace();
    if (!place) return;
    if (place && place.formatted_address) {
      useFormReturn.setValue(fieldName, place.formatted_address);

      const newDirectionsValue: TDirectionsValueProps = {
        ...directionsValue,
        [fieldName]: place.formatted_address,
      };

      setDirectionsValue(newDirectionsValue);
    }
  };

  const handleOnSubmit: SubmitHandler<TFormValuesProps> = async (data) => {
    try {
      const newFiles = (data.images || []).filter((img): img is File => img instanceof File);

      const updateData: {
        title: string;
        origin: string;
        destination: string;
        distance?: string;
        estimatedDuration?: string;
        description?: string;
        status: 'planning' | 'completed';
        tripImages?: { create: { image: File }[] };
      } = {
        title: data.title,
        origin: data.origin,
        destination: data.destination,
        distance: distanceInfo.distance,
        estimatedDuration: distanceInfo.duration,
        description: data.description,
        status: data.status,
      };

      if (newFiles.length > 0) {
        updateData.tripImages = {
          create: newFiles.map((file) => ({ image: file })),
        };
      }

      await updateTripMutation({
        variables: {
          where: { id: trip.id },
          data: updateData,
        },
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    const fetchDistance = async () => {
      if (directionsValue.origin && directionsValue.destination) {
        const originStr = JSON.stringify(directionsValue.origin);

        const destinationStr = JSON.stringify(directionsValue.destination);

        getDistance(originStr, destinationStr).catch((error) => {
          console.error('Error fetching distance:', error);
        });
      }
    };

    fetchDistance();
  }, [directionsValue.origin, directionsValue.destination, getDistance]);

  useEffect(() => {
    const currentStatus = useFormReturn.watch('status');
    const currentImages = useFormReturn.watch('images');

    if (currentStatus === 'planning' && currentImages && currentImages.length > 0) {
      useFormReturn.setValue('images', []);
    }
  }, [useFormReturn.watch('status')]);

  if (!isLoaded) return <div>Form Loading...</div>;

  return (
    <TripFormProvider
      useForm={useFormReturn}
      isEditing={true}
      onSubmit={handleSubmitCallback}
      onReset={handleClearDirections}
    >
      <div className="h-full px-5 border-r border-gray-200">
        <CreateTripForm
          useForm={useFormReturn}
          setDirectionsValue={setDirectionsValue}
          handlePlaceSelect={handlePlaceSelect}
          originAutocomplete={originAutocomplete}
          destinationAutocomplete={destinationAutocomplete}
          setOriginAutocomplete={setOriginAutocomplete}
          setDestinationAutocomplete={setDestinationAutocomplete}
          isEditing={true}
        />
      </div>
    </TripFormProvider>
  );
};
