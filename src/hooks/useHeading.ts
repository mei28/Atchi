import { useMemo } from "react";
import { MIN_SPEED_FOR_GPS_HEADING } from "../constants";

type HeadingSource = "compass" | "gps" | "unavailable";

type HeadingResult = {
  /** 端末の向いている方位 (真北基準、0-360度)。不明なら null */
  heading: number | null;
  source: HeadingSource;
};

/**
 * コンパス方位と GPS heading を統合し、利用可能な方位を返す
 */
export function useHeading(
  compassHeading: number | null,
  gpsHeading: number | null,
  speed: number | null,
): HeadingResult {
  return useMemo(() => {
    if (compassHeading != null) {
      return { heading: compassHeading, source: "compass" as const };
    }
    if (gpsHeading != null && speed != null && speed >= MIN_SPEED_FOR_GPS_HEADING) {
      return { heading: gpsHeading, source: "gps" as const };
    }
    return { heading: null, source: "unavailable" as const };
  }, [compassHeading, gpsHeading, speed]);
}
