type Props = {
  name: string;
  onConfirm: () => void;
};

export default function DestinationConfirm({ name, onConfirm }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted">目的地</p>
        <p className="truncate font-heading font-semibold text-ink">{name}</p>
      </div>
      <button
        onClick={onConfirm}
        className="shrink-0 rounded-xl bg-coral px-5 py-3 font-heading font-semibold text-white shadow-sm transition-transform active:scale-95"
      >
        あっちへ行く
      </button>
    </div>
  );
}
