import { useState, useCallback } from "react";
import type { LatLng, Destination, SearchSuggestion } from "../../types";
import { reverseGeocode } from "../../lib/nominatim";
import { useGeolocation } from "../../hooks/useGeolocation";
import { usePlaceSearch } from "../../hooks/usePlaceSearch";
import { useI18n } from "../../i18n/I18nProvider";
import SearchBar from "./SearchBar";
import MapView from "./MapView";
import DestinationConfirm from "./DestinationConfirm";
import LanguageToggle from "../shared/LanguageToggle";

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
  const [isLoadingName, setIsLoadingName] = useState(false);
  const geo = useGeolocation();
  const { locale, t } = useI18n();
  const placeSearch = usePlaceSearch(locale);

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
    setIsLoadingName(true);
    const name = await reverseGeocode(latlng, locale);
    setSelectedName(
      name ? name.split(",").slice(0, 2).join(",").trim() : t("geo.unknownPlace"),
    );
    setIsLoadingName(false);
  }, [locale, t]);

  const handleSearchSelect = useCallback(
    async (suggestion: SearchSuggestion) => {
      setIsLoadingName(true);
      const result = await placeSearch.select(suggestion);
      setSelectedPosition(result.position);
      setSelectedName(result.name);
      setIsLoadingName(false);
    },
    [placeSearch],
  );

  const handleResetDestination = useCallback(() => {
    setSelectedPosition(null);
    setSelectedName("");
    setIsLoadingName(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selectedPosition || !selectedName) return;
    onStart({ position: selectedPosition, name: selectedName });
  }, [selectedPosition, selectedName, onStart]);

  return (
    <div className="flex h-full flex-col bg-base">
      <header className="px-5 pb-3 pt-safe-top">
        <div className="flex items-center justify-between pt-4">
          <h1 className="font-heading text-2xl font-bold text-ink">
            Atchi
          </h1>
          <LanguageToggle />
        </div>
        <p className="text-sm text-muted">{t("destination.subtitle")}</p>
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

      {selectedPosition && selectedName && !isLoadingName && (
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
