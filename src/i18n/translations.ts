import type { Locale } from "./types";

const translations = {
  // DestinationScreen
  "destination.subtitle": {
    ja: "どこへ行く?",
    en: "Where to?",
  },

  // SearchBar
  "search.placeholder": {
    ja: "場所・施設名で検索",
    en: "Search places",
  },
  "search.loading": {
    ja: "検索中...",
    en: "Searching...",
  },
  "search.noResults": {
    ja: "該当する場所が見つかりませんでした",
    en: "No places found",
  },
  "search.error": {
    ja: "検索に失敗しました",
    en: "Search failed",
  },

  // DestinationConfirm
  "confirm.label": {
    ja: "目的地",
    en: "Destination",
  },
  "confirm.go": {
    ja: "あっちへ行く",
    en: "Let's go!",
  },
  "confirm.resetAriaLabel": {
    ja: "目的地をリセット",
    en: "Reset destination",
  },
  "confirm.shareAriaLabel": {
    ja: "共有",
    en: "Share",
  },

  // MapView
  "map.flyToUserAriaLabel": {
    ja: "現在地へ移動",
    en: "Go to current location",
  },

  // NavigationHeader
  "nav.backAriaLabel": {
    ja: "戻る",
    en: "Back",
  },
  "nav.shareAriaLabel": {
    ja: "共有",
    en: "Share",
  },

  // NavigationScreen hints
  "nav.hintWalk": {
    ja: "歩くと方向がわかります",
    en: "Start walking to detect direction",
  },
  "nav.hintGps": {
    ja: "GPS で方向を検出中",
    en: "Detecting direction via GPS",
  },

  // DistanceDisplay
  "distance.calculating": {
    ja: "距離を計算中...",
    en: "Calculating distance...",
  },

  // ArrivalCelebration
  "arrival.title": {
    ja: "到着!",
    en: "You arrived!",
  },
  "arrival.newDestination": {
    ja: "新しい目的地を探す",
    en: "Find a new destination",
  },

  // PermissionGate
  "permission.locationTitle": {
    ja: "位置情報が必要です",
    en: "Location access required",
  },
  "permission.locationDescription": {
    ja: "設定からこのサイトの位置情報アクセスを許可してください",
    en: "Please allow location access for this site in your settings",
  },
  "permission.compassTitle": {
    ja: "コンパスを有効にする",
    en: "Enable compass",
  },
  "permission.compassDescription": {
    ja: "方向を示すためにデバイスのコンパスを使います",
    en: "We use your device compass to show direction",
  },
  "permission.allow": {
    ja: "許可する",
    en: "Allow",
  },

  // ErrorBoundary
  "error.title": {
    ja: "エラーが発生しました",
    en: "Something went wrong",
  },
  "error.retry": {
    ja: "やり直す",
    en: "Try again",
  },

  // InstallBanner
  "install.title": {
    ja: "ホーム画面に追加",
    en: "Add to home screen",
  },
  "install.iosHint": {
    ja: "共有ボタン → 「ホーム画面に追加」",
    en: "Tap Share → \"Add to Home Screen\"",
  },
  "install.androidHint": {
    ja: "すぐアクセスできるようになります",
    en: "Quick access from your home screen",
  },
  "install.add": {
    ja: "追加",
    en: "Add",
  },
  "install.closeAriaLabel": {
    ja: "閉じる",
    en: "Close",
  },

  // Share
  "share.text": {
    ja: "「{{name}}」へあっちへ行こう!",
    en: "Let's go to \"{{name}}\" with Atchi!",
  },

  // App
  "app.sharedDestination": {
    ja: "共有された目的地",
    en: "Shared destination",
  },

  // Reverse geocode fallback
  "geo.unknownPlace": {
    ja: "不明な場所",
    en: "Unknown place",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function translate(key: TranslationKey, locale: Locale): string {
  return translations[key][locale];
}
