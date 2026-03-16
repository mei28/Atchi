import { useRef } from "react";
import { COMPASS_TRANSITION_MS } from "../../constants";

type Props = {
  rotation: number | null;
  heading: number | null;
};

const LABELS = [
  { text: "N", deg: 0, accent: true },
  { text: "E", deg: 90, accent: false },
  { text: "S", deg: 180, accent: false },
  { text: "W", deg: 270, accent: false },
] as const;

/**
 * 0-360 の角度を累積値に変換し、常に最短経路で回転させる。
 * CSS transition が 350°→10° で逆回り 340° するのを防ぐ。
 */
function useContinuousAngle(angle: number | null): number | null {
  const prev = useRef<number | null>(null);

  if (angle == null) return null;

  if (prev.current == null) {
    prev.current = angle;
    return angle;
  }

  let delta = angle - (((prev.current % 360) + 360) % 360);
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;

  prev.current += delta;
  return prev.current;
}

export default function CompassArrow({ rotation, heading }: Props) {
  const isActive = rotation != null;

  const smoothRotation = useContinuousAngle(rotation);
  const smoothLabelRotation = useContinuousAngle(
    heading != null ? -heading : null,
  );

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="h-64 w-64"
        style={{
          filter: isActive
            ? "drop-shadow(0 4px 16px rgba(255,107,74,0.2))"
            : undefined,
        }}
      >
        {/* 外周の円枠 */}
        <circle
          cx="100" cy="100" r="96"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2"
        />

        {/* 方角ラベル — heading に連動して実際の方角を示す */}
        <g
          style={{
            transform: smoothLabelRotation != null
              ? `rotate(${smoothLabelRotation}deg)`
              : undefined,
            transformOrigin: "100px 100px",
            transition: `transform ${COMPASS_TRANSITION_MS}ms ease-out`,
          }}
        >
          {LABELS.map(({ text, deg, accent }) => (
            <g key={text} transform={`rotate(${deg} 100 100)`}>
              <text
                x="100"
                y="22"
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${-deg} 100 22)`}
                className={`font-heading text-[13px] ${accent ? "fill-coral font-semibold" : "fill-muted/50"}`}
              >
                {text}
              </text>
            </g>
          ))}
        </g>

        {/* 矢尻 */}
        <g
          style={{
            transform: smoothRotation != null
              ? `rotate(${smoothRotation}deg)`
              : undefined,
            transformOrigin: "100px 100px",
            transition: `transform ${COMPASS_TRANSITION_MS}ms ease-out`,
            opacity: isActive ? 1 : 0.2,
          }}
        >
          <path
            d="
              M92 52
              Q100 38, 108 52
              C114 62, 158 116, 160 130
              Q162 142, 150 142
              C140 142, 116 122, 106 114
              Q100 108, 94 114
              C84 122, 60 142, 50 142
              Q38 142, 40 130
              C42 116, 86 62, 92 52
              Z
            "
            fill="var(--color-coral)"
          />
        </g>
      </svg>
    </div>
  );
}
