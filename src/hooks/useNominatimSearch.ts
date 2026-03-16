import { useState, useCallback } from "react";
import type { LatLng, NominatimResult } from "../types";
import { searchPlaces } from "../lib/nominatim";

type SearchState = {
  results: NominatimResult[];
  isLoading: boolean;
  error: string | null;
};

export function useNominatimSearch() {
  const [state, setState] = useState<SearchState>({
    results: [],
    isLoading: false,
    error: null,
  });

  const search = useCallback(async (query: string, userLocation?: LatLng | null) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setState({ results: [], isLoading: true, error: null });
    try {
      const results = await searchPlaces(trimmed, userLocation);
      setState({ results, isLoading: false, error: null });
    } catch (e) {
      setState({
        results: [],
        isLoading: false,
        error: e instanceof Error ? e.message : "検索に失敗しました",
      });
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({ results: [], isLoading: false, error: null });
  }, []);

  return { ...state, search, clearResults } as const;
}
