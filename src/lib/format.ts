/**
 * メートル距離を人間が読みやすい文字列にフォーマットする
 * - 1000m 未満: "850 m"
 * - 1000m 以上: "1.2 km"
 */
export function formatDistance(meters: number): { value: string; unit: string } {
  if (meters < 1000) {
    return { value: Math.round(meters).toString(), unit: "m" };
  }
  const km = meters / 1000;
  return { value: km < 10 ? km.toFixed(1) : Math.round(km).toString(), unit: "km" };
}
