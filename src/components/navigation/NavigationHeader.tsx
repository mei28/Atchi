type Props = {
  destinationName: string;
  onBack: () => void;
};

export default function NavigationHeader({ destinationName, onBack }: Props) {
  return (
    <header className="flex items-center gap-3 px-5 pt-safe-top">
      <button
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors active:bg-ink/10"
        aria-label="戻る"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1 className="min-w-0 flex-1 truncate font-heading text-lg font-semibold text-ink">
        {destinationName}
      </h1>
    </header>
  );
}
