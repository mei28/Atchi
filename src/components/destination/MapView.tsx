import { useCallback, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "../../types";

const markerIcon = L.divIcon({
  className: "",
  html: `<svg viewBox="0 0 24 36" width="24" height="36" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#FF6B4A"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

function MapClickHandler({ onClick }: { onClick: (latlng: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

/** マウント時に現在地へ移動 (位置情報が許可されている場合) */
function InitialLocation({ userLocation }: { userLocation: LatLng | null }) {
  const map = useMap();
  const didFly = useRef(false);

  useEffect(() => {
    if (didFly.current || !userLocation) return;
    didFly.current = true;
    map.setView([userLocation.lat, userLocation.lng], 16);
  }, [map, userLocation]);

  return null;
}

/** selectedPosition が変わったら地図を移動 */
function FlyToPosition({ position }: { position: LatLng | null }) {
  const map = useMap();
  const prevRef = useRef<LatLng | null>(null);

  useEffect(() => {
    if (!position) return;
    // 同じ位置への重複 flyTo を防止
    if (
      prevRef.current &&
      prevRef.current.lat === position.lat &&
      prevRef.current.lng === position.lng
    ) return;
    prevRef.current = position;
    map.flyTo([position.lat, position.lng], 17);
  }, [map, position]);

  return null;
}

type Props = {
  selectedPosition: LatLng | null;
  userLocation: LatLng | null;
  userAccuracy: number | null;
  onMapClick: (latlng: LatLng) => void;
};

export default function MapView({
  selectedPosition,
  userLocation,
  userAccuracy,
  onMapClick,
}: Props) {
  const handleClick = useCallback(
    (latlng: LatLng) => {
      onMapClick(latlng);
    },
    [onMapClick],
  );

  return (
    <MapContainer
      center={[35.6812, 139.7671]}
      zoom={16}
      className="h-full w-full rounded-2xl"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onClick={handleClick} />
      <InitialLocation userLocation={userLocation} />
      <FlyToPosition position={selectedPosition} />

      {/* 現在地: 精度圏 + 青ドット */}
      {userLocation && (
        <>
          {userAccuracy && (
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={userAccuracy}
              pathOptions={{
                color: "#4A90D9",
                fillColor: "#4A90D9",
                fillOpacity: 0.1,
                weight: 1,
              }}
            />
          )}
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={7}
            pathOptions={{
              color: "white",
              fillColor: "#4A90D9",
              fillOpacity: 1,
              weight: 2.5,
            }}
          />
        </>
      )}

      {/* 選択地点: コーラルのピン */}
      {selectedPosition && (
        <Marker
          position={[selectedPosition.lat, selectedPosition.lng]}
          icon={markerIcon}
        />
      )}
    </MapContainer>
  );
}
