import { formatDistance } from "../../lib/format";
import { useT } from "../../i18n/I18nProvider";

type Props = {
  meters: number | null;
};

export default function DistanceDisplay({ meters }: Props) {
  const t = useT();

  if (meters == null) {
    return (
      <p className="font-mono text-2xl text-muted">
        {t("distance.calculating")}
      </p>
    );
  }

  const { value, unit } = formatDistance(meters);

  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-6xl font-bold text-ink">
        {value}
      </span>
      <span className="font-mono text-2xl text-blue">
        {unit}
      </span>
    </div>
  );
}
