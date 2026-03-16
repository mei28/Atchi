import { useMemo } from "react";
import type { LatLng } from "../types";
import { distanceMeters } from "../lib/geo";

/**
 * 現在地から目的地までの距離 (メートル) を返す
 */
export function useDistance(
  position: LatLng | null,
  destination: LatLng | null,
): number | null {
  return useMemo(() => {
    if (!position || !destination) return null;
    return distanceMeters(position, destination);
  }, [position, destination]);
}
