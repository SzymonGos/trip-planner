export type TDirectionsValueProps = {
  origin: google.maps.LatLngLiteral | string;
  destination: google.maps.LatLngLiteral | string;
  waypoints?: google.maps.DirectionsWaypoint[];
};
