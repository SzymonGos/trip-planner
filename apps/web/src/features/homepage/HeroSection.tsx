import Link from 'next/link';
import React from 'react';

export const HeroSection = () => (
  <section className="relative h-[70vh] bg-orange-200 flex items-center justify-center">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 to-transparent" />

    {/* Hero Content */}
    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Plan Your Perfect Trip</h1>
      <p className="text-xl sm:text-2xl text-white/90 mb-8">
        Discover amazing destinations and create unforgettable memories
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/trips"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Start Planning
        </Link>
        <Link
          href="/trips"
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Browse Destinations
        </Link>
      </div>
    </div>

    <svg
      className="absolute bottom-0 block w-full h-[60px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path fill="#ffffff" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
    </svg>
  </section>
);
