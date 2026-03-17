import { useT } from "../../i18n/I18nProvider";

type Props = {
  onBack: () => void;
};

export default function ArrivalCelebration({ onBack }: Props) {
  const t = useT();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="animate-celebrate-ring absolute h-24 w-24 rounded-full border-2 border-coral" />
        <div className="animate-celebrate-ring absolute h-24 w-24 rounded-full border-2 border-coral" style={{ animationDelay: "0.7s" }} />
        <div className="animate-celebrate-pulse flex h-16 w-16 items-center justify-center rounded-full bg-coral">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <p className="font-heading text-xl font-bold text-ink">{t("arrival.title")}</p>

      <button
        onClick={onBack}
        className="rounded-full bg-coral px-8 py-3 font-heading font-semibold text-white transition-transform active:scale-95"
      >
        {t("arrival.newDestination")}
      </button>
    </div>
  );
}
