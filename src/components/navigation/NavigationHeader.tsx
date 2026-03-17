import { useCallback } from "react";
import type { Destination } from "../../types";
import { shareDestination } from "../../lib/share";
import { useT } from "../../i18n/I18nProvider";

type Props = {
  destination: Destination;
  onBack: () => void;
};

export default function NavigationHeader({ destination, onBack }: Props) {
  const t = useT();

  const handleShare = useCallback(() => {
    shareDestination(
      destination,
      t("share.text", { name: destination.name }),
    );
  }, [destination, t]);

  return (
    <header className="flex items-center gap-3 px-5 pt-safe-top">
      <button
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors active:bg-ink/10"
        aria-label={t("nav.backAriaLabel")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1 className="min-w-0 flex-1 truncate font-heading text-lg font-semibold text-ink">
        {destination.name}
      </h1>
      <button
        onClick={handleShare}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors active:bg-ink/10"
        aria-label={t("nav.shareAriaLabel")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
    </header>
  );
}
