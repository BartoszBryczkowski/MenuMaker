"use client";

import { useEffect, useState } from "react";

type AuthState = {
  isAuthenticated: boolean;
  slug: string | null;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    slug: null,
  });

  useEffect(() => {
    let alive = true;

    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!alive) return;

        if (!res.ok) {
          setState({ isAuthenticated: false, slug: null });
          return;
        }

        const data = await res.json();
        setState({
          isAuthenticated: true,
          slug: data?.user?.slug ?? null,
        });
      })
      .catch(() => {
        if (!alive) return;
        setState({ isAuthenticated: false, slug: null });
      });

    return () => {
      alive = false;
    };
  }, []);

  return state;
}
