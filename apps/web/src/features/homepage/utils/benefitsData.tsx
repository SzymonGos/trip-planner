import { BoltIcon } from '@/components/Icons/BoltIcon';
import { CloudIcon } from '@/components/Icons/CloudIcon';
import { MapPinIcon } from '@/components/Icons/MapPinIcon';
import { ShieldCheck } from '@/components/Icons/ShieldCheck';

export const PRODUCT_BENEFITS_DATA = [
  {
    icon: <MapPinIcon />,
    title: 'Traveler First',
    description: 'Created by passionate travelers who understand what makes a journey truly memorable.',
  },
  {
    icon: <BoltIcon />,
    title: 'AI-Powered Planning',
    description: 'Let our smart algorithms craft personalized itineraries that match your travel style perfectly.',
    isNew: true,
  },
  {
    icon: <BoltIcon />,
    title: 'Lightning Fast',
    description: 'From idea to itinerary in minutes, with real-time updates that keep you ahead of the curve.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Travel Security',
    description: 'Your personal information stays protected with enterprise-level encryption and privacy controls.',
  },
  {
    icon: <BoltIcon />,
    title: 'Scalable Platform',
    description: "Whether you're planning solo adventures or coordinating group expeditions, we've got you covered.",
  },
  {
    icon: <CloudIcon />,
    title: 'Cloud Native',
    description: 'Access your travel plans from anywhere in the world with our seamless cloud infrastructure.',
  },
];
