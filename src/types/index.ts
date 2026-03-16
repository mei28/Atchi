export type LatLng = {
  lat: number;
  lng: number;
};

export type Destination = {
  position: LatLng;
  name: string;
};

export type Screen = "destination" | "navigation";

export type GeolocationState = {
  position: LatLng | null;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
  error: GeolocationPositionError | null;
};

export type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  class: string;
  addresstype?: string;
};
