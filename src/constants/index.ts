/** 到着判定距離 (メートル) */
export const ARRIVAL_THRESHOLD_METERS = 20;

/** GPS watchPosition のオプション */
export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 5000,
  timeout: 10000,
};

/** GPS heading を使う最低速度 (m/s) — 歩行速度の下限 */
export const MIN_SPEED_FOR_GPS_HEADING = 0.5;

/** コンパス矢印の回転 transition 時間 (ms) */
export const COMPASS_TRANSITION_MS = 500;

/** Nominatim API ベース URL */
export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

/** Nominatim リクエスト用 User-Agent */
export const NOMINATIM_USER_AGENT = "Atchi/1.0";

/** Mapbox Access Token */
export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/** Mapbox Search Box API ベース URL */
export const MAPBOX_SEARCH_BASE_URL = "https://api.mapbox.com/search/searchbox/v1";
