import { useCallback } from "react";
import type { Destination } from "../../types";
import { shareDestination } from "../../lib/share";
import { useT } from "../../i18n/I18nProvider";

type Props = {
  destination: Destination;
  onConfirm: () => void;
  onReset: () => void;
};

export default function DestinationConfirm({ destination, onConfirm, onReset }: Props) {
  const t = useT();

  const handleShare = useCallback(() => {
    shareDestination(
      destination,
      t("share.text", { name: destination.name }),
    );
  }, [destination, t]);

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted">{t("confirm.label")}</p>
        <p className="truncate font-heading font-semibold text-ink">{destination.name}</p>
      </div>
      <button
        onClick={onReset}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors active:bg-ink/10"
        aria-label={t("confirm.resetAriaLabel")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <button
        onClick={handleShare}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors active:bg-ink/10"
        aria-label={t("confirm.shareAriaLabel")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
      <button
        onClick={onConfirm}
        className="shrink-0 rounded-xl bg-coral px-5 py-3 font-heading font-semibold text-white shadow-sm transition-transform active:scale-95"
      >
        {t("confirm.go")}
      </button>
    </div>
  );
}
