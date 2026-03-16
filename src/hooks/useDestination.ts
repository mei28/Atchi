import { useState, useCallback, useEffect } from "react";
import type { Destination } from "../types";

const STORAGE_KEY = "atchi:destination";

function loadDestination(): Destination | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as Destination;
}

export function useDestination() {
  const [destination, setDestinationState] = useState<Destination | null>(
    loadDestination,
  );

  useEffect(() => {
    if (destination) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(destination));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [destination]);

  const setDestination = useCallback((dest: Destination | null) => {
    setDestinationState(dest);
  }, []);

  return { destination, setDestination } as const;
}
