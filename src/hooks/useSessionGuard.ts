// hooks/useSessionGuard.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { resetSessionExpired } from "@/lib/session";

export function useSessionGuard() {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const domHandler = () => setIsExpired(true);
    const domResetHandler = () => setIsExpired(false);

    window.addEventListener("session-expired", domHandler);
    window.addEventListener("session-expired-reset", domResetHandler);

    // BroadcastChannel (multi-tab)
    let bc: BroadcastChannel | null = null;
    try {
      if ("BroadcastChannel" in window) {
        bc = new BroadcastChannel("session-channel");
        bc.addEventListener("message", (ev) => {
          if (ev.data === "session-expired") setIsExpired(true);
          if (ev.data === "session-expired-reset") setIsExpired(false);
        });
      }
    } catch (e) {
      bc = null;
    }

    // localStorage fallback (storage event fires in other tabs)
    const storageHandler = (ev: StorageEvent) => {
      if (ev.key === "session-expired" && ev.newValue) setIsExpired(true);
      if (ev.key === "session-expired-reset" && ev.newValue) setIsExpired(false);
    };
    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("session-expired", domHandler);
      window.removeEventListener("session-expired-reset", domResetHandler);
      window.removeEventListener("storage", storageHandler);
      if (bc) bc.close();
    };
  }, []);

  // reset() clears the UI flag and notifies other tabs
  const reset = useCallback(() => {
    setIsExpired(false);
    resetSessionExpired();
  }, []);

  return { isExpired, reset };
}