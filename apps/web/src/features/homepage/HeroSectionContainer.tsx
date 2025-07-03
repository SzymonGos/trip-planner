'use client';

import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { HeroSection } from './HeroSection';

export const HeroSectionContainer = () => {
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);
  const overlayY = useTransform(scrollY, [0, 500], [0, -100]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  return <HeroSection backgroundY={backgroundY} overlayY={overlayY} textY={textY} />;
};
