"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  CSSProperties,
} from "react";
import { ThemeConfig } from "@/types/menu";

const presets: Record<string, ThemeConfig> = {
  classic: {
    primary: "#d6320d",
    secondary: "#16213e",
    accent: "#e94560",
    background: "#f5f0e8",
    surface: "#ffffff",
    text: "#1a1a2e",
    textSecondary: "#555555",
    borderRadius: "8px",
    layout: "classic",
    colorScheme: "classic",
  },
  modern: {
    primary: "#00d4aa",
    secondary: "#1a1a1a",
    accent: "#00d4aa",
    background: "#0f0f0f",
    surface: "#1a1a1a",
    text: "#ffffff",
    textSecondary: "#aaaaaa",
    borderRadius: "16px",
    layout: "modern",
    colorScheme: "modern",
  },
  grid: {
    primary: "#2d1b69",
    secondary: "#5b21b6",
    accent: "#f59e0b",
    background: "#faf5ff",
    surface: "#ffffff",
    text: "#2d1b69",
    textSecondary: "#6b7280",
    borderRadius: "12px",
    layout: "grid",
    colorScheme: "grid",
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (t: ThemeConfig) => Promise<void>;
  applyPreset: (
    name: string,
    mode?: "all" | "color" | "layout",
  ) => Promise<void>;
  presetNames: string[];
  cssVars: CSSProperties;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
  slug,
}: {
  children: ReactNode;
  slug?: string;
}) {
  const [theme, setThemeState] = useState<ThemeConfig>(presets.classic);

  useEffect(() => {
    if (!slug) return;

    const loadTheme = async () => {
      try {
        const res = await fetch(`/api/users/${slug}`);
        if (!res.ok) return;

        const user = await res.json();
        if (user?.theme && typeof user.theme === "object") {
          setThemeState(user.theme as ThemeConfig);
        }
      } catch (error) {
        console.error("Nie udało się pobrać theme", error);
      }
    };

    loadTheme();
  }, [slug]);

  const setTheme = async (nextTheme: ThemeConfig) => {
    setThemeState(nextTheme);
  };

  const applyPreset = async (
    name: string,
    mode: "all" | "color" | "layout" = "all",
  ) => {
    const preset = presets[name];
    if (!preset) return;

    setThemeState((prev) => {
      if (mode === "color") {
        return {
          ...prev,
          primary: preset.primary,
          secondary: preset.secondary,
          accent: preset.accent,
          background: preset.background,
          surface: preset.surface,
          text: preset.text,
          textSecondary: preset.textSecondary,
          borderRadius: preset.borderRadius,
          colorScheme: name,
        };
      }

      if (mode === "layout") {
        return { ...prev, layout: name };
      }

      return { ...preset };
    });
  };

  const cssVars = useMemo(
    () => ({
      "--color-primary": theme.primary,
      "--color-secondary": theme.secondary,
      "--color-accent": theme.accent,
      "--color-bg": theme.background,
      "--color-surface": theme.surface,
      "--color-text": theme.text,
      "--color-text-secondary": theme.textSecondary,
      "--radius": theme.borderRadius,
    }),
    [theme],
  );

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
  }, [cssVars]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        applyPreset,
        presetNames: Object.keys(presets),
        cssVars: cssVars as CSSProperties,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
