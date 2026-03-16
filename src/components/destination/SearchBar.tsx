import { useState, type FormEvent } from "react";
import type { NominatimResult } from "../../types";

type Props = {
  results: NominatimResult[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  onSearch: (query: string) => void;
  onSelect: (result: NominatimResult) => void;
  onClear: () => void;
};

/** display_name から見やすい名前と補足を分離する */
function formatResult(result: NominatimResult): { name: string; detail: string } {
  const parts = result.display_name.split(",").map((s) => s.trim());
  const name = parts[0];
  const detail = parts.slice(1, 4).join(", ");
  return { name, detail };
}

export default function SearchBar({
  results,
  isLoading,
  error,
  hasSearched,
  onSearch,
  onSelect,
  onClear,
}: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSelect = (result: NominatimResult) => {
    const { name } = formatResult(result);
    setQuery(name);
    onSelect(result);
    onClear();
  };

  const showDropdown = results.length > 0 || (hasSearched && !isLoading && results.length === 0);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
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
            className="w-full rounded-xl border-2 border-transparent bg-white/80 py-3 pl-10 pr-4 font-body text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-coral"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="rounded-xl bg-coral px-5 py-3 font-heading font-semibold text-white shadow-sm transition-transform disabled:opacity-40 active:scale-95"
        >
          {isLoading ? "..." : "検索"}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-sm text-coral">{error}</p>
      )}

      {showDropdown && (
        <ul className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-xl bg-white shadow-lg">
          {results.length > 0
            ? results.map((result) => {
                const { name, detail } = formatResult(result);
                return (
                  <li key={result.place_id}>
                    <button
                      onClick={() => handleSelect(result)}
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
                        <p className="truncate text-sm font-medium text-ink">{name}</p>
                        <p className="truncate text-xs text-muted">{detail}</p>
                      </div>
                    </button>
                  </li>
                );
              })
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
