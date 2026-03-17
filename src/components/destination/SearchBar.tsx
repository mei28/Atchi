import { useState, useEffect, useRef } from "react";
import type { SearchSuggestion } from "../../types";

type Props = {
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
  onSearch: (query: string) => void;
  onSelect: (suggestion: SearchSuggestion) => void;
  onClear: () => void;
};

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

export default function SearchBar({
  suggestions,
  isLoading,
  error,
  onSearch,
  onSelect,
  onClear,
}: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  // デバウンス検索
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      onClear();
      setIsOpen(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      onSearch(trimmed);
      setIsOpen(true);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name);
    setIsOpen(false);
    onSelect(suggestion);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    onClear();
  };

  const showDropdown = isOpen && (suggestions.length > 0 || (isLoading === false && error == null && suggestions.length === 0));

  return (
    <div className="relative">
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted"
          fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="場所・施設名で検索"
          className="w-full rounded-xl border-2 border-transparent bg-white/80 py-3 pl-10 pr-10 font-body text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-coral"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted transition-colors active:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm text-muted shadow-lg">
          検索中...
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-coral">{error}</p>
      )}

      {showDropdown && !isLoading && (
        <ul className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-xl bg-white shadow-lg">
          {suggestions.length > 0
            ? suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <button
                    onClick={() => handleSelect(suggestion)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-base active:bg-base"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-4.5 w-4.5 shrink-0 text-coral"
                      fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{suggestion.name}</p>
                      <p className="truncate text-xs text-muted">{suggestion.detail}</p>
                    </div>
                  </button>
                </li>
              ))
            : (
              <li className="px-4 py-4 text-center text-sm text-muted">
                該当する場所が見つかりませんでした
              </li>
            )
          }
        </ul>
      )}
    </div>
  );
}
