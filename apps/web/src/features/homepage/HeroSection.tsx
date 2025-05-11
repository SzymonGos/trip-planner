import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { getTripPlannerUrl } from '../trip/helpers/getTripPlannerUrl';

export const HeroSection = () => (
  <section className="relative h-[70vh] flex mb-20 items-center justify-center">
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 to-transparent" />
    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Plan Your Destination</h1>
      <p className="text-xl sm:text-2xl text-white/90 mb-8">Amazing destinations in the world</p>
    </div>
    <div className="absolute bottom-0 w-full h-[60px] bg-white mask-wave" />
    <div className="absolute flex items-center justify-center -bottom-7 bg-white rounded-xl w-[500px] h-[100px] shadow-sm ">
      {/* style buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          className="py-6 text-lg font-bold bg-tp-primary"
          size="lg"
          // className="bg-tp-primary text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          <Link href={getTripPlannerUrl()} className="">
            Start Planning
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="py-6 text-lg font-bold"
          size="lg"
          // className="bg-white/10 hover:bg-white/20 text-gray-600 px-8 py-4 rounded-lg text-lg font-semibold"
        >
          <Link href="/trips">Browse Trips</Link>
        </Button>
      </div>
    </div>
  </section>
);
