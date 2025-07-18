'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTripForm } from './CreateTripForm';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { TDirectionsValueProps } from '@/lib/contexts/constants';
import { useMutation } from '@apollo/client';
import { createTripMutationQuery } from '../../server/actions/createTripMutationQuery';
import { useGoogleMapLoader } from '@/features/googleMap/hooks/useGoogleMapLoader';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema } from '../../helpers/formValidation';
import { useRouter } from 'next/navigation';
import { getTripUrl } from '../../helpers/getTripUrl';
import { getUserTripsQuery } from '@/features/user/server/db/getUserTripsQuery';
import { getTripsQuery } from '../../server/db/getTripsQuery';
import { TripFormProvider } from '../../contexts/TripFormProvider';

export type TTripImageFormValueProps = {
  id: string;
  image: {
    id: string;
    filename: string;
  };
};

export type TFormValuesProps = {
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: 'planning' | 'completed';
  images?: (File | TTripImageFormValueProps)[];
} & z.infer<typeof tripSchema>;

export type TAutocompleteProps = google.maps.places.Autocomplete | null;

export const CreateTripFormContainer = () => {
  const [originAutocomplete, setOriginAutocomplete] = useState<TAutocompleteProps>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<TAutocompleteProps>(null);
  const { directionsValue, setDirectionsValue, handleClearDirections, distanceInfo, getDistance } =
    useGoogleMapsDirections();
  const { isLoaded } = useGoogleMapLoader();
  const { authUserId } = useAuthenticatedUser();
  const router = useRouter();

  const [createTripMutation] = useMutation(createTripMutationQuery);

  const defaultValues = {
    title: '',
    description: '',
    origin: typeof directionsValue.origin === 'string' ? directionsValue.origin : '',
    destination: typeof directionsValue.destination === 'string' ? directionsValue.destination : '',
    status: 'planning' as const,
    images: [],
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
      const files = (data.images || []).filter((img): img is File => img instanceof File);
      const tripImages = files.map((file) => ({ image: file }));
      const createTripResponse = await createTripMutation({
        variables: {
          data: {
            title: data.title,
            description: data.description,
            origin: data.origin,
            destination: data.destination,
            status: data.status,
            tripImages: {
              create: tripImages,
            },
            creator: {
              connect: {
                id: authUserId,
              },
            },
            distance: distanceInfo.distance,
            estimatedDuration: distanceInfo.duration,
          },
        },
        refetchQueries: [{ query: getTripsQuery }, { query: getUserTripsQuery }],
      });

      const tripId = createTripResponse?.data?.createTrip?.id;
      useFormReturn.reset();
      handleClearDirections();
      router?.push(getTripUrl(tripId));
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleClearForm = () => {
    useFormReturn.reset();
    handleClearDirections();
  };

  const handleSubmitCallback = useFormReturn.handleSubmit(handleOnSubmit);

  useEffect(() => {
    useFormReturn.setValue('origin', typeof directionsValue?.origin === 'string' ? directionsValue.origin : '');
    useFormReturn.setValue(
      'destination',
      typeof directionsValue.destination === 'string' ? directionsValue.destination : '',
    );
  }, [directionsValue, useFormReturn]);

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
      isEditing={false}
      onSubmit={handleSubmitCallback}
      onReset={handleClearForm}
    >
      <div>
        <h1 className="mb-5 text-3xl font-semibold">Plan your trip</h1>
        <CreateTripForm
          useForm={useFormReturn}
          setDirectionsValue={setDirectionsValue}
          handlePlaceSelect={handlePlaceSelect}
          originAutocomplete={originAutocomplete}
          destinationAutocomplete={destinationAutocomplete}
          setOriginAutocomplete={setOriginAutocomplete}
          setDestinationAutocomplete={setDestinationAutocomplete}
        />

        {distanceInfo && (
          <div className="mt-4 p-4 border-[0.5px] rounded-md  border-tp-gray-100">
            <h4 className="mb-4 text-lg font-primary font-semibold">Trip Information: </h4>

            <div className="w-full flex">
              Distance:
              <div className="ml-auto font-semibold">{distanceInfo.distance}</div>
            </div>
            <div className="w-full flex">
              Estimated Duration: <div className="ml-auto font-semibold">{distanceInfo.duration}</div>
            </div>
          </div>
        )}
      </div>
    </TripFormProvider>
  );
};
