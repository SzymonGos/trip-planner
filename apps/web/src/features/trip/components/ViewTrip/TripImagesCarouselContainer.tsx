import React, { FC, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { TripImage as TTripImage } from 'tp-graphql-types';
import { TripImagesCarousel } from './TripImagesCarousel';

interface TripImagesCarouselContainerProps {
  images: TTripImage[];
}

export const TripImagesCarouselContainer: FC<TripImagesCarouselContainerProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 2, loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return <TripImagesCarousel images={images} emblaRef={emblaRef} scrollPrev={scrollPrev} scrollNext={scrollNext} />;
};
