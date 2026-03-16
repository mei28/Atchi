import { useState, useEffect, useCallback } from "react";

type DeviceOrientationState = {
  /** 真北基準の方位 (0-360度)。取得不可なら null */
  compassHeading: number | null;
  /** iOS パーミッション要求が必要か */
  needsPermission: boolean;
  /** パーミッションを要求する関数 (iOS のみ) */
  requestPermission: () => Promise<void>;
};

export function useDeviceOrientation(): DeviceOrientationState {
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [needsPermission, setNeedsPermission] = useState(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let raw: number | null = null;

    // iOS: webkitCompassHeading が真北基準の方位を直接返す
    const webkit = (event as DeviceOrientationEvent & { webkitCompassHeading?: number })
      .webkitCompassHeading;
    if (webkit != null && isFinite(webkit)) {
      raw = webkit;
    } else if (event.alpha != null && event.absolute) {
      // Android: absolute alpha を真北基準に変換
      raw = (360 - event.alpha) % 360;
    }

    if (raw == null) return;

    setCompassHeading(raw);
  }, []);

  const startListening = useCallback(() => {
    window.addEventListener("deviceorientationabsolute", handleOrientation as EventListener);
    window.addEventListener("deviceorientation", handleOrientation);
  }, [handleOrientation]);

  const requestPermission = useCallback(async () => {
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (DOE.requestPermission) {
      const result = await DOE.requestPermission();
      if (result === "granted") {
        setNeedsPermission(false);
        startListening();
      }
    }
  }, [startListening]);

  useEffect(() => {
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (DOE.requestPermission) {
      setNeedsPermission(true);
    } else {
      startListening();
    }

    return () => {
      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation as EventListener,
      );
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [handleOrientation, startListening]);

  return { compassHeading, needsPermission, requestPermission };
}
