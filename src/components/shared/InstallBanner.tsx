import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import { useT } from "../../i18n/I18nProvider";

export default function InstallBanner() {
  const { canInstall, isIOS, install, dismiss } = useInstallPrompt();
  const t = useT();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up px-4 pb-safe-bottom">
      <div className="mx-auto mb-4 flex max-w-md items-center gap-3 rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy">
          <svg viewBox="0 0 64 64" className="h-6 w-6">
            <circle cx="32" cy="32" r="30" fill="#0D1B2A" />
            <path
              d="M30 18 Q32 13, 34 18 C36 22, 52 40, 52.5 45 Q53 49, 49 49 C46 49, 38 42, 35 39 Q32 37, 29 39 C26 42, 18 49, 15 49 Q11 49, 11.5 45 C12 40, 28 22, 30 18 Z"
              fill="#FF6B4A"
            />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-semibold text-ink">
            {t("install.title")}
          </p>
          <p className="text-xs text-muted">
            {isIOS
              ? t("install.iosHint")
              : t("install.androidHint")}
          </p>
        </div>

        {!isIOS && (
          <button
            onClick={install}
            className="shrink-0 rounded-full bg-coral px-4 py-1.5 font-heading text-sm font-semibold text-white transition-transform active:scale-95"
          >
            {t("install.add")}
          </button>
        )}

        <button
          onClick={dismiss}
          className="shrink-0 p-1 text-muted transition-colors hover:text-ink"
          aria-label={t("install.closeAriaLabel")}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
