import { useMemo } from "react";
import type { LatLng } from "../types";
import { bearingDegrees } from "../lib/geo";

/**
 * 現在地から目的地への方位角を返す
 */
export function useBearing(
  position: LatLng | null,
  destination: LatLng | null,
): number | null {
  return useMemo(() => {
    if (!position || !destination) return null;
    return bearingDegrees(position, destination);
  }, [position, destination]);
}
