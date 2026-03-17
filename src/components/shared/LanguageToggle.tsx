import { useLocale } from "../../i18n/I18nProvider";
import type { Locale } from "../../i18n/types";

const options: { value: Locale; label: string }[] = [
  { value: "ja", label: "JA" },
  { value: "en", label: "EN" },
];

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex overflow-hidden rounded-lg bg-ink/5 text-xs font-semibold">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLocale(opt.value)}
          className={`px-2.5 py-1 transition-colors ${
            locale === opt.value
              ? "bg-coral text-white"
              : "text-muted active:bg-ink/10"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
