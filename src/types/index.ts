export type LatLng = {
  lat: number;
  lng: number;
};

export type Destination = {
  position: LatLng;
  name: string;
};

export type Screen = "destination" | "navigation";

export type GeolocationState = {
  position: LatLng | null;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
  error: GeolocationPositionError | null;
};

/** 検索候補 (プロバイダー非依存) */
export type SearchSuggestion = {
  id: string;
  name: string;
  detail: string;
};

/** 検索結果 (位置確定済み) */
export type SearchResult = {
  id: string;
  name: string;
  detail: string;
  position: LatLng;
};
