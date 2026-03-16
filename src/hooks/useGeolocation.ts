import { useState, useEffect, useRef } from "react";
import type { GeolocationState } from "../types";
import { GEOLOCATION_OPTIONS } from "../constants";

const initialState: GeolocationState = {
  position: null,
  accuracy: null,
  heading: null,
  speed: null,
  error: null,
};

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>(initialState);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          accuracy: pos.coords.accuracy,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
          error: null,
        });
      },
      (err) => {
        setState((prev) => ({ ...prev, error: err }));
      },
      GEOLOCATION_OPTIONS,
    );

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  return state;
}
