import { useState, useCallback } from "react";
import type { LatLng, Destination, SearchSuggestion } from "../../types";
import { reverseGeocode } from "../../lib/nominatim";
import { useGeolocation } from "../../hooks/useGeolocation";
import { usePlaceSearch } from "../../hooks/usePlaceSearch";
import SearchBar from "./SearchBar";
import MapView from "./MapView";
import DestinationConfirm from "./DestinationConfirm";

type Props = {
  initialDestination?: Destination | null;
  onStart: (destination: Destination) => void;
};

export default function DestinationScreen({ initialDestination, onStart }: Props) {
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(
    initialDestination?.position ?? null,
  );
  const [selectedName, setSelectedName] = useState<string>(
    initialDestination?.name ?? "",
  );
  const geo = useGeolocation();
  const placeSearch = usePlaceSearch();

  const handleSearch = useCallback(
    (query: string) => {
      placeSearch.search(query, geo.position);
    },
    [placeSearch, geo.position],
  );

  const handleClear = useCallback(() => {
    placeSearch.clearSuggestions();
  }, [placeSearch]);

  const handleMapClick = useCallback(async (latlng: LatLng) => {
    setSelectedPosition(latlng);
    setSelectedName("読み込み中...");
    const name = await reverseGeocode(latlng);
    setSelectedName(name.split(",").slice(0, 2).join(",").trim());
  }, []);

  const handleSearchSelect = useCallback(
    async (suggestion: SearchSuggestion) => {
      setSelectedName("読み込み中...");
      const result = await placeSearch.select(suggestion);
      setSelectedPosition(result.position);
      setSelectedName(result.name);
    },
    [placeSearch],
  );

  const handleResetDestination = useCallback(() => {
    setSelectedPosition(null);
    setSelectedName("");
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selectedPosition || !selectedName) return;
    onStart({ position: selectedPosition, name: selectedName });
  }, [selectedPosition, selectedName, onStart]);

  return (
    <div className="flex h-full flex-col bg-base">
      <header className="px-5 pb-3 pt-safe-top">
        <h1 className="pt-4 font-heading text-2xl font-bold text-ink">
          Atchi
        </h1>
        <p className="text-sm text-muted">どこへ行く?</p>
      </header>

      <div className="relative z-10 px-5 pb-3">
        <SearchBar
          suggestions={placeSearch.suggestions}
          isLoading={placeSearch.isLoading}
          error={placeSearch.error}
          onSearch={handleSearch}
          onSelect={handleSearchSelect}
          onClear={handleClear}
        />
      </div>

      <div className="isolate mx-5 flex-1 overflow-hidden rounded-2xl shadow-sm">
        <MapView
          selectedPosition={selectedPosition}
          userLocation={geo.position}
          userAccuracy={geo.accuracy}
          onMapClick={handleMapClick}
        />
      </div>

      {selectedPosition && selectedName && selectedName !== "読み込み中..." && (
        <div className="px-5 pb-safe-bottom pt-3">
          <DestinationConfirm
            destination={{ position: selectedPosition!, name: selectedName }}
            onConfirm={handleConfirm}
            onReset={handleResetDestination}
          />
        </div>
      )}
    </div>
  );
}
