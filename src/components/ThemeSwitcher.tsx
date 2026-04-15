// src/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "@/context/ThemeContext";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

const colorSchemes = {
  classic: { label: "☀️ Zwykły", colors: "warm" },
  modern: { label: "🌙 Modern", colors: "dark" },
  grid: { label: "💜 Grid", colors: "purple" },
};

const layouts = {
  classic: { label: "📄 Lista", icon: "☰" },
  modern: { label: "🃏 Karty", icon: "▦" },
  grid: { label: "🔲 Grid", icon: "⊞" },
};

export default function ThemeSwitcher() {
  const { presetNames, applyPreset, theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const panelSpring = useSpring({
    transform: open ? "translateY(0%)" : "translateY(100%)",
    opacity: open ? 1 : 0,
    config: { tension: 260, friction: 24 },
  });

  const handleColorChange = (name: string) => {
    applyPreset(name, "color");
  };

  const handleLayoutChange = (name: string) => {
    applyPreset(name, "layout");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <animated.div
          style={panelSpring}
          className="mb-2 overflow-hidden backdrop-blur-md"
          role="menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              background: "var(--color-surface)",
              borderRadius: "var(--radius)",
              border:
                "1px solid color-mix(in srgb, var(--color-text) 12%, transparent)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              minWidth: 220,
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 text-xs font-bold uppercase tracking-widest"
              style={{
                color: "var(--color-text-secondary)",
                borderBottom:
                  "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
              }}
            >
              Wybór motywu
            </div>

            {/* Color Section */}
            <div className="px-4 pt-3 pb-1">
              <span
                className="mb-2 block text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                🎨 Kolory
              </span>
              <div className="flex flex-col gap-1.5">
                {presetNames.map((name) => {
                  const scheme =
                    colorSchemes[name as keyof typeof colorSchemes];
                  const isActive = theme.colorScheme === name;
                  return (
                    <button
                      key={`color-${name}`}
                      onClick={() => handleColorChange(name)}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: isActive
                          ? "color-mix(in srgb, var(--color-accent) 15%, transparent)"
                          : "transparent",
                        color: isActive
                          ? "var(--color-accent)"
                          : "var(--color-text)",
                        border: isActive
                          ? "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)"
                          : "1px solid transparent",
                      }}
                    >
                      <span className="text-base">
                        {scheme?.label.split(" ")[0]}
                      </span>
                      <span>{scheme?.label.split(" ")[1] ?? name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div
              className="mx-4 my-2"
              style={{
                height: 1,
                background:
                  "color-mix(in srgb, var(--color-text) 8%, transparent)",
              }}
            />

            {/* Layout Section */}
            <div className="px-4 pt-1 pb-3">
              <span
                className="mb-2 block text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                📐 Layout
              </span>
              <div className="flex gap-1.5">
                {presetNames.map((name) => {
                  const layoutInfo = layouts[name as keyof typeof layouts];
                  const isActive = theme.layout === name;
                  return (
                    <button
                      key={`layout-${name}`}
                      onClick={() => handleLayoutChange(name)}
                      className="flex flex-1 flex-col items-center gap-1 rounded-md px-2 py-2.5 text-xs font-medium transition-all hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        background: isActive
                          ? "color-mix(in srgb, var(--color-accent) 15%, transparent)"
                          : "color-mix(in srgb, var(--color-text) 5%, transparent)",
                        color: isActive
                          ? "var(--color-accent)"
                          : "var(--color-text)",
                        border: isActive
                          ? "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)"
                          : "1px solid transparent",
                      }}
                    >
                      <span className="text-lg leading-none">
                        {layoutInfo?.icon}
                      </span>
                      <span>{layoutInfo?.label.split(" ")[1] ?? name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </animated.div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center text-xl text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{
          background: "var(--color-accent)",
          borderRadius: "var(--radius)",
        }}
        aria-label="Toggle theme switcher"
      >
        {open ? "✕" : "🎨"}
      </button>
    </div>
  );
}
