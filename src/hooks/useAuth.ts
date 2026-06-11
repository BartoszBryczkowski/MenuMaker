"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;

    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!alive) return;
        setAuthenticated(res.ok);
      })
      .catch(() => {
        if (!alive) return;
        setAuthenticated(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return authenticated;
}
