import type { Destination } from "../../types";
import { ARRIVAL_THRESHOLD_METERS } from "../../constants";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useDeviceOrientation } from "../../hooks/useDeviceOrientation";
import { useHeading } from "../../hooks/useHeading";
import { useBearing } from "../../hooks/useBearing";
import { useDistance } from "../../hooks/useDistance";
import PermissionGate from "../shared/PermissionGate";
import NavigationHeader from "./NavigationHeader";
import CompassArrow from "./CompassArrow";
import DistanceDisplay from "./DistanceDisplay";
import ArrivalCelebration from "./ArrivalCelebration";

type Props = {
  destination: Destination;
  onBack: () => void;
};

export default function NavigationScreen({ destination, onBack }: Props) {
  const geo = useGeolocation();
  const orientation = useDeviceOrientation();
  const { heading, source: headingSource } = useHeading(
    orientation.compassHeading,
    geo.heading,
    geo.speed,
  );
  const bearing = useBearing(geo.position, destination.position);
  const distance = useDistance(geo.position, destination.position);

  const rotation =
    bearing != null && heading != null
      ? ((bearing - heading + 360) % 360)
      : null;

  const hasArrived = distance != null && distance <= ARRIVAL_THRESHOLD_METERS;

  if (hasArrived) {
    return <ArrivalCelebration onBack={onBack} />;
  }

  return (
    <PermissionGate
      geoError={geo.error}
      needsOrientationPermission={orientation.needsPermission}
      onRequestOrientationPermission={orientation.requestPermission}
    >
      <div className="flex h-full flex-col bg-base">
        <div className="pt-4">
          <NavigationHeader destination={destination} onBack={onBack} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <CompassArrow rotation={rotation} heading={heading} />
          <DistanceDisplay meters={distance} />

          {headingSource === "unavailable" && (
            <p className="text-sm text-muted">
              歩くと方向がわかります
            </p>
          )}
          {headingSource === "gps" && (
            <p className="text-sm text-muted">
              GPS で方向を検出中
            </p>
          )}
        </div>
      </div>
    </PermissionGate>
  );
}
