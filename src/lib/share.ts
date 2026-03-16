import type { Destination } from "../types";

export function buildShareURL(destination: Destination): string {
  const url = new URL(window.location.pathname, window.location.origin);
  url.searchParams.set("lat", destination.position.lat.toFixed(6));
  url.searchParams.set("lng", destination.position.lng.toFixed(6));
  url.searchParams.set("name", destination.name);
  return url.toString();
}

export async function shareDestination(destination: Destination): Promise<void> {
  const url = buildShareURL(destination);
  const shareData = {
    title: `Atchi - ${destination.name}`,
    text: `「${destination.name}」へあっちへ行こう!`,
    url,
  };

  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    await navigator.clipboard.writeText(url);
  }
}
