export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;

export interface IPlacesProp {
  setLocation: (position: LatLngLiteral) => void;
}
