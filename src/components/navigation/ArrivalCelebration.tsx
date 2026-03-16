type Props = {
  onBack: () => void;
};

export default function ArrivalCelebration({ onBack }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-base px-8">
      <div className="relative flex items-center justify-center">
        <div className="animate-celebrate-ring absolute h-48 w-48 rounded-full border-4 border-coral" />
        <div className="animate-celebrate-ring absolute h-48 w-48 rounded-full border-4 border-coral" style={{ animationDelay: "0.7s" }} />
        <div className="animate-celebrate-pulse flex h-32 w-32 items-center justify-center rounded-full bg-coral">
          <svg viewBox="0 0 24 24" className="h-16 w-16 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <p className="font-heading text-3xl font-bold text-ink">到着!</p>
        <p className="mt-2 text-muted">目的地に着きました</p>
      </div>

      <button
        onClick={onBack}
        className="rounded-full bg-coral px-8 py-3 font-heading font-semibold text-white transition-transform active:scale-95"
      >
        新しい目的地を探す
      </button>
    </div>
  );
}
