import type { LatLng, SearchSuggestion, SearchResult } from "../types";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_SEARCH_BASE_URL } from "../constants";

type SuggestResponse = {
  suggestions: {
    name: string;
    name_preferred?: string;
    mapbox_id: string;
    place_formatted?: string;
    full_address?: string;
  }[];
};

type RetrieveResponse = {
  features: {
    geometry: { coordinates: [number, number] };
    properties: {
      name: string;
      name_preferred?: string;
      mapbox_id: string;
      place_formatted?: string;
      full_address?: string;
    };
  }[];
};

export async function suggest(
  query: string,
  sessionToken: string,
  proximity?: LatLng | null,
  signal?: AbortSignal,
): Promise<SearchSuggestion[]> {
  const url = new URL(`${MAPBOX_SEARCH_BASE_URL}/suggest`);
  url.searchParams.set("q", query);
  url.searchParams.set("access_token", MAPBOX_ACCESS_TOKEN);
  url.searchParams.set("session_token", sessionToken);
  url.searchParams.set("language", "ja");
  url.searchParams.set("limit", "8");
  url.searchParams.set(
    "types",
    "poi,address,place,locality,neighborhood,street",
  );

  if (proximity) {
    url.searchParams.set("proximity", `${proximity.lng},${proximity.lat}`);
  }

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`Mapbox suggest failed: ${res.status}`);

  const data: SuggestResponse = await res.json();

  return data.suggestions.map((s) => ({
    id: s.mapbox_id,
    name: s.name_preferred ?? s.name,
    detail: s.place_formatted ?? s.full_address ?? "",
  }));
}

export async function retrieve(
  mapboxId: string,
  sessionToken: string,
): Promise<SearchResult> {
  const url = new URL(`${MAPBOX_SEARCH_BASE_URL}/retrieve/${mapboxId}`);
  url.searchParams.set("access_token", MAPBOX_ACCESS_TOKEN);
  url.searchParams.set("session_token", sessionToken);
  url.searchParams.set("language", "ja");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Mapbox retrieve failed: ${res.status}`);

  const data: RetrieveResponse = await res.json();
  const feature = data.features[0];
  if (!feature) throw new Error("Mapbox retrieve returned no features");

  const [lng, lat] = feature.geometry.coordinates;
  const props = feature.properties;

  return {
    id: props.mapbox_id,
    name: props.name_preferred ?? props.name,
    detail: props.place_formatted ?? props.full_address ?? "",
    position: { lat, lng },
  };
}
