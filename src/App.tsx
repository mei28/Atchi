import { useState, useCallback } from "react";
import type { Screen, Destination } from "./types";
import { useDestination } from "./hooks/useDestination";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import DestinationScreen from "./components/destination/DestinationScreen";
import NavigationScreen from "./components/navigation/NavigationScreen";

export default function App() {
  const [screen, setScreen] = useState<Screen>("destination");
  const { destination, setDestination } = useDestination();

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
          <DestinationScreen onStart={handleStart} />
        )}
        {screen === "navigation" && destination && (
          <NavigationScreen destination={destination} onBack={handleBack} />
        )}
      </div>
    </ErrorBoundary>
  );
}
