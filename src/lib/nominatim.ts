import type { LatLng, NominatimResult } from "../types";
import { NOMINATIM_BASE_URL } from "../constants";

/**
 * 場所検索。userLocation が渡された場合、その周辺を優先して返す。
 */
export async function searchPlaces(
  query: string,
  userLocation?: LatLng | null,
): Promise<NominatimResult[]> {
  const url = new URL("/search", NOMINATIM_BASE_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "8");
  url.searchParams.set("accept-language", "ja");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("dedupe", "0");

  // 現在地周辺にバイアスをかける (強制ではない)
  if (userLocation) {
    const delta = 0.5; // 約50km四方
    url.searchParams.set(
      "viewbox",
      `${userLocation.lng - delta},${userLocation.lat + delta},${userLocation.lng + delta},${userLocation.lat - delta}`,
    );
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Nominatim search failed: ${res.status}`);
  const results: NominatimResult[] = await res.json();

  // 現在地がある場合、近い順にソート
  if (userLocation) {
    results.sort((a, b) => {
      const dA = (parseFloat(a.lat) - userLocation.lat) ** 2 + (parseFloat(a.lon) - userLocation.lng) ** 2;
      const dB = (parseFloat(b.lat) - userLocation.lat) ** 2 + (parseFloat(b.lon) - userLocation.lng) ** 2;
      return dA - dB;
    });
  }

  return results;
}

export async function reverseGeocode(position: LatLng): Promise<string> {
  const url = new URL("/reverse", NOMINATIM_BASE_URL);
  url.searchParams.set("lat", position.lat.toString());
  url.searchParams.set("lon", position.lng.toString());
  url.searchParams.set("format", "json");
  url.searchParams.set("accept-language", "ja");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Nominatim reverse failed: ${res.status}`);
  const data = await res.json();
  return data.display_name ?? "不明な場所";
}
