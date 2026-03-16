import { useState, useCallback } from "react";
import type { LatLng, Destination, NominatimResult } from "../../types";
import { reverseGeocode } from "../../lib/nominatim";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useNominatimSearch } from "../../hooks/useNominatimSearch";
import SearchBar from "./SearchBar";
import MapView from "./MapView";
import DestinationConfirm from "./DestinationConfirm";

type Props = {
  onStart: (destination: Destination) => void;
};

export default function DestinationScreen({ onStart }: Props) {
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const geo = useGeolocation();
  const search = useNominatimSearch();

  const handleSearch = useCallback(
    (query: string) => {
      setHasSearched(true);
      search.search(query, geo.position);
    },
    [search, geo.position],
  );

  const handleClear = useCallback(() => {
    search.clearResults();
    setHasSearched(false);
  }, [search]);

  const handleMapClick = useCallback(async (latlng: LatLng) => {
    setSelectedPosition(latlng);
    setSelectedName("読み込み中...");
    const name = await reverseGeocode(latlng);
    setSelectedName(name.split(",").slice(0, 2).join(",").trim());
  }, []);

  const handleSearchSelect = useCallback((result: NominatimResult) => {
    const position: LatLng = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };
    setSelectedPosition(position);
    setSelectedName(result.display_name.split(",").slice(0, 2).join(",").trim());
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

      <div className="px-5 pb-3">
        <SearchBar
          results={search.results}
          isLoading={search.isLoading}
          error={search.error}
          hasSearched={hasSearched}
          onSearch={handleSearch}
          onSelect={handleSearchSelect}
          onClear={handleClear}
        />
      </div>

      <div className="mx-5 flex-1 overflow-hidden rounded-2xl shadow-sm">
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
            name={selectedName}
            onConfirm={handleConfirm}
          />
        </div>
      )}
    </div>
  );
}
