import { useState, useCallback, useEffect } from "react";
import type { Screen, Destination } from "./types";
import { useDestination } from "./hooks/useDestination";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import InstallBanner from "./components/shared/InstallBanner";
import DestinationScreen from "./components/destination/DestinationScreen";
import NavigationScreen from "./components/navigation/NavigationScreen";

/** URL パラメータから目的地を読み取る */
function parseDestinationFromURL(): Destination | null {
  const params = new URLSearchParams(window.location.search);
  const lat = params.get("lat");
  const lng = params.get("lng");
  const name = params.get("name");
  if (lat == null || lng == null) return null;
  const latN = parseFloat(lat);
  const lngN = parseFloat(lng);
  if (!isFinite(latN) || !isFinite(lngN)) return null;
  return {
    position: { lat: latN, lng: lngN },
    name: name || "共有された目的地",
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("destination");
  const { destination, setDestination } = useDestination();

  // URL パラメータから目的地を復元（地図画面で確認してから開始）
  useEffect(() => {
    const dest = parseDestinationFromURL();
    if (dest) {
      setDestination(dest);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = useCallback(
    (dest: Destination) => {
      setDestination(dest);
      setScreen("navigation");
    },
    [setDestination],
  );

  const handleBack = useCallback(() => {
    setScreen("destination");
  }, []);

  return (
    <ErrorBoundary>
      <div className="h-full">
        {screen === "destination" && (
          <DestinationScreen initialDestination={destination} onStart={handleStart} />
        )}
        {screen === "navigation" && destination && (
          <NavigationScreen destination={destination} onBack={handleBack} />
        )}
      </div>
      <InstallBanner />
    </ErrorBoundary>
  );
}
