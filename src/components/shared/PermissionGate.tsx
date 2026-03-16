import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  geoError: GeolocationPositionError | null;
  needsOrientationPermission: boolean;
  onRequestOrientationPermission: () => void;
};

export default function PermissionGate({
  children,
  geoError,
  needsOrientationPermission,
  onRequestOrientationPermission,
}: Props) {
  if (geoError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 bg-base px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink/5">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-coral" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div>
          <p className="font-heading text-xl font-semibold text-ink">
            位置情報が必要です
          </p>
          <p className="mt-2 text-sm text-muted">
            設定からこのサイトの位置情報アクセスを許可してください
          </p>
        </div>
      </div>
    );
  }

  if (needsOrientationPermission) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 bg-base px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink/5">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-blue" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </div>
        <div>
          <p className="font-heading text-xl font-semibold text-ink">
            コンパスを有効にする
          </p>
          <p className="mt-2 text-sm text-muted">
            方向を示すためにデバイスのコンパスを使います
          </p>
        </div>
        <button
          onClick={onRequestOrientationPermission}
          className="rounded-full bg-coral px-8 py-3 font-heading font-semibold text-white transition-transform active:scale-95"
        >
          許可する
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
