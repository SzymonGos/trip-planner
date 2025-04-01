import { getTripPlannerUrl } from '@/features/trip/helpers/getTripPlannerUrl';
import { getTripsUrl } from '@/features/trip/helpers/getTripsUrl';

export const navbarLinks = [
  {
    id: 'plan_trip',
    name: 'plan trip',
    url: getTripPlannerUrl(),
  },
  {
    id: 'trips',
    name: 'trips',
    url: getTripsUrl(),
  },
];
