import { useState, useRef, useCallback } from "react";
import type { LatLng, SearchSuggestion, SearchResult } from "../types";
import { suggest, retrieve } from "../lib/mapbox";

type State = {
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
};

export function usePlaceSearch() {
  const [state, setState] = useState<State>({
    suggestions: [],
    isLoading: false,
    error: null,
  });

  const sessionTokenRef = useRef(crypto.randomUUID());
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(
    async (query: string, userLocation?: LatLng | null) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      // 前リクエストを中断
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const suggestions = await suggest(
          trimmed,
          sessionTokenRef.current,
          userLocation,
          controller.signal,
        );
        setState({ suggestions, isLoading: false, error: null });
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setState({
          suggestions: [],
          isLoading: false,
          error: e instanceof Error ? e.message : "検索に失敗しました",
        });
      }
    },
    [],
  );

  const select = useCallback(
    async (suggestion: SearchSuggestion): Promise<SearchResult> => {
      const result = await retrieve(
        suggestion.id,
        sessionTokenRef.current,
      );
      // セッション完了 → トークンリセット
      sessionTokenRef.current = crypto.randomUUID();
      return result;
    },
    [],
  );

  const clearSuggestions = useCallback(() => {
    abortRef.current?.abort();
    setState({ suggestions: [], isLoading: false, error: null });
    sessionTokenRef.current = crypto.randomUUID();
  }, []);

  return { ...state, search, select, clearSuggestions } as const;
}
