import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { FC } from 'react';
import { getTripPlannerUrl } from '../trip/helpers/getTripPlannerUrl';
import Image from 'next/image';
import { motion, MotionValue } from 'framer-motion';

type THeroSectionProps = {
  backgroundY: MotionValue<number>;
  overlayY: MotionValue<number>;
  textY: MotionValue<number>;
};

export const HeroSection: FC<THeroSectionProps> = ({ backgroundY, overlayY, textY }) => (
  <section className="relative h-[70vh] flex mb-20 items-center justify-center overflow-hidden">
    <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
      <Image src="/images/road-landscape.webp" alt="Open road with mountains" fill className="object-cover" priority />
    </motion.div>

    <motion.div
      className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 to-transparent"
      style={{ y: overlayY }}
    />

    <motion.div
      className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center"
      style={{ y: textY }}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-6 font-primary">
        Plan Your Next Adventure
      </h1>
      <p className="text-lg sm:text-xl text-white mb-10 font-normal max-w-2xl mx-auto font-secondary">
        Turn your dream trip into a shared journey — plan it, shape it, live it.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="py-6 text-lg bg-tp-primary" size="lg">
          <Link href={getTripPlannerUrl()}>Start Planning</Link>
        </Button>
        <Button asChild variant="outline" className="py-6 text-lg" size="lg">
          <Link href="/trips">Browse Trips</Link>
        </Button>
      </div>
    </motion.div>
    <div className="absolute bottom-0 w-full h-[60px] bg-[#f9f9f9] backdrop-blur-sm mask-wave" />
  </section>
);
