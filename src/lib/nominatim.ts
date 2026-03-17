import type { LatLng } from "../types";
import type { Locale } from "../i18n/types";
import { NOMINATIM_BASE_URL } from "../constants";

export async function reverseGeocode(
  position: LatLng,
  language: Locale = "ja",
): Promise<string> {
  const url = new URL("/reverse", NOMINATIM_BASE_URL);
  url.searchParams.set("lat", position.lat.toString());
  url.searchParams.set("lon", position.lng.toString());
  url.searchParams.set("format", "json");
  url.searchParams.set("accept-language", language);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Nominatim reverse failed: ${res.status}`);
  const data = await res.json();
  return data.display_name ?? null;
}
